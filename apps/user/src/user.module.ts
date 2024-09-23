import { Module } from "@nestjs/common";
import { UserResolver } from "./user.resolver";
import { UserService } from "./user.service";
import { GraphQLModule } from "@nestjs/graphql";
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from "@nestjs/apollo";
import { AuthModule } from "@app/auth";
import { DatabaseModule } from "@app/database";
import { Role, User } from "@app/shared";

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      typePaths: ["**/*.graphql"],
    }),
    DatabaseModule.register({ entities: [User, Role], synchronize: true }),
    AuthModule,
  ],
  providers: [UserService, UserResolver],
})
export class UserModule {}
