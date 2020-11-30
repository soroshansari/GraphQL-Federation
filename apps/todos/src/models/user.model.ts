import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { Todo } from './todo.model';

@ObjectType()
@Directive('@extends')
@Directive('@key(fields: "id")')
export class User {
  @Field((type) => ID)
  @Directive('@external')
  id: number;

  @Field((type) => [Todo])
  todos?: Todo[];

  constructor(user: Partial<User>) {
    Object.assign(user);
  }
}
