import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloFederationDriver } from "@nestjs/apollo";

@Module({
  imports: [
    GraphQLModule.forRoot({
      driver: ApolloFederationDriver,
      typePaths: ["**/*.graphql"],
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
