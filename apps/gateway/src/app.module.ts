import { Module } from '@nestjs/common';
import { GATEWAY_BUILD_SERVICE, GraphQLGatewayModule, GraphQLSchemaBuilderModule } from '@nestjs/graphql';
import { BuildServiceModule } from './build-service.module';
import { ApolloComplexityPlugin } from './common/plugins/complexity.plugin';
import { LoggingPlugin } from './common/plugins/logging.plugin';

@Module({
  imports: [
    GraphQLGatewayModule.forRootAsync({
      useFactory: async () => ({
        gateway: {
          serviceList: [
            { name: 'users', url: 'http://[::1]:3001/graphql' },
            { name: 'posts', url: 'http://[::1]:3002/graphql' },
            { name: 'todos', url: 'http://[::1]:3003/graphql' },
          ],
        },
        server: {
          cors: true,
          context: ({ req }) => ({
            jwt: req.headers.authorization,
          }),
          plugins: [new LoggingPlugin(), new ApolloComplexityPlugin(30)]
        },
      }),
      imports: [BuildServiceModule, GraphQLSchemaBuilderModule],
      inject: [GATEWAY_BUILD_SERVICE],
    }),
  ],
})
export class AppModule {}
