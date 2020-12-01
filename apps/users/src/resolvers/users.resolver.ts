import {
  Args,
  Int,
  Mutation,
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
    return this.getUser(Number(reference.id));
  }

  @Mutation((returns) => User, { name: 'addUser' })
  addUser(@Args('name') name: string): User {
    return this.usersService.add(name);
  }

  @Query((returns) => User, { name: 'user' })
  getUser(@Args('id', { type: () => Int }) id: number): User {
    return this.usersService.findOneById(id);
  }

  @Query((returns) => [User], { name: 'users' })
  getAllUsers(): User[] {
    return this.usersService.getAll();
  }

  @ResolveField((returns) => String, { name: 'sub' })
  public getJwtName(@GqlUserId() userId: string): string {
    return userId;
  }
}
