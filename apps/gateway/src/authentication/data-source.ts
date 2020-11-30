import { RemoteGraphQLDataSource } from '@apollo/gateway';
import { decode } from 'jsonwebtoken';

export class AuthenticatedDataSource extends RemoteGraphQLDataSource {
  async willSendRequest({ request, context }) {
    const { sub } = context.jwt
      ? (decode(context.jwt) as any)
      : { sub: 'none' };
    request.http.headers.set('x-user-id', sub);
  }
}
