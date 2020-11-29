import { join } from 'path';

import { Module } from '@nestjs/common';
import { GraphQLFederationModule } from '@nestjs/graphql';

import { User } from './models/user.model';

import { UsersResolver } from './resolvers/users.resolver';
import { PostsService } from './services/posts.service';
import { PostsResolver } from './resolvers/posts.resolver';

@Module({
  imports: [
    GraphQLFederationModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'apps/posts/src/schema.gql'),
      buildSchemaOptions: { orphanedTypes: [User] },
    }),
  ],
  providers: [PostsResolver, UsersResolver, PostsService],
})
export class PostsModule {}
