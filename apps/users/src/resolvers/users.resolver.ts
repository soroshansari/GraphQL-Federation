import {
  Args,
  Int,
  Query,
  ResolveField,
  Resolver,
  ResolveReference,
} from '@nestjs/graphql';
import { GqlUserId } from '../decorators/decorators';

import { User } from '../models/user.model';
import { UsersService } from '../services/users.service';

@Resolver((of) => User)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }) {
    switch (reference.__typename) {
      case User.name:
        return this.getUser(Number(reference.id));
      default:
        return null;
    }
  }

  @Query((returns) => User, { name: 'user' })
  getUser(@Args('id', { type: () => Int }) id: number): User {
    return this.usersService.findOneById(id);
  }

  @ResolveField((returns) => String, { name: 'sub' })
  public getJwtName(@GqlUserId() userId: string): string {
    return userId;
  }
}
