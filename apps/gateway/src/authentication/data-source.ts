import { RemoteGraphQLDataSource } from '@apollo/gateway';
// import { decode } from 'jsonwebtoken';

export class AuthenticatedDataSource extends RemoteGraphQLDataSource {
  async willSendRequest({ request, context }) {
    // const { userId } = context.jwt ? (decode(context.jwt) as any) : '';
    const userId = '245';
    request.http.headers.set('x-user-id', userId);
  }
}
