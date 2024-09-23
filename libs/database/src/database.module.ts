import { DynamicModule, Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { EntityClassOrSchema } from "@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type";

@Module({
  imports: [ConfigModule.forRoot()],
})
export class DatabaseModule {
  static register({
    entities,
    synchronize,
    logging,
  }: {
    entities: EntityClassOrSchema[];
    synchronize: boolean;
    logging?: "all";
  }): DynamicModule {
    return {
      module: DatabaseModule,
      imports: [
        TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: (configService: ConfigService) => {
            const host = configService.get<string>("DB_HOST");
            const port = configService.get<number>("DB_PORT");
            const username = configService.get<string>("DB_USERNAME");
            const password = configService.get<string>("DB_PASSWORD");
            const databaseURL = configService.get<string>("DB_URL");
            const database = configService.get<string>("DB_NAME");
            if (!databaseURL)
              if (!host || !port || !username || !password || !database) {
                throw new Error(
                  "Database configuration is missing critical values."
                );
              }

            return {
              type: "postgres",
              url: databaseURL,
              host,
              port,
              username,
              password,
              database,
              entities: entities,
              synchronize: synchronize,
              logging: logging ? "all" : null,
            } as TypeOrmModuleOptions;
          },
        }),
        TypeOrmModule.forFeature(entities),
      ],
      exports: [TypeOrmModule],
    };
  }
}
