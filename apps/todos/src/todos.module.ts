import { join } from 'path';

import { Module } from '@nestjs/common';
import { GraphQLFederationModule } from '@nestjs/graphql';

import { TodosResolver } from './resolvers/todos.resolver';
import { HttpProvider } from './providers/http.provider';
import { UsersResolver } from './resolvers/users.resolver';

@Module({
  imports: [
    GraphQLFederationModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'apps/todos/src/schema.gql'),
    }),
  ],
  providers: [TodosResolver, UsersResolver, HttpProvider],
})
export class TodosModule {}
