import { IntrospectAndCompose } from "@apollo/gateway";
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { GatewayService } from "./gateway.service";
import { GatewayController } from "./gateway.controller";
import FileUploadDataSource from "@profusion/apollo-federation-upload/build/FileUploadDataSource";

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      gateway: {
        buildService: ({ url }) =>
          new FileUploadDataSource({ url, useChunkedTransfer: true }),
        supergraphSdl: new IntrospectAndCompose({
          subgraphs: [{ name: "users", url: "http://localhost:3001/graphql" }],
        }),
      },
      server: {},
    }),
  ],
  controllers: [GatewayController],
  providers: [GatewayService],
})
export class GatewayModule {}
