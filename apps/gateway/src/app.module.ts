import { Module } from '@nestjs/common';
import { GATEWAY_BUILD_SERVICE, GraphQLGatewayModule } from '@nestjs/graphql';
import { BuildServiceModule } from './build-service.module';

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
        },
      }),
      imports: [BuildServiceModule],
      inject: [GATEWAY_BUILD_SERVICE],
    }),
  ],
})
export class AppModule {}
