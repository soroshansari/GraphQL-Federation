import { Plugin } from '@nestjs/graphql';
import {
  ApolloServerPlugin,
  GraphQLRequestListener,
} from 'apollo-server-plugin-base';

@Plugin()
export class LoggingPlugin implements ApolloServerPlugin {
  requestDidStart(): GraphQLRequestListener {
    const now = Date.now();
    console.debug('Before...');
    return {
      willSendResponse() {
        console.debug(`After... ${Date.now() - now}ms`);
      },
    };
  }
}
