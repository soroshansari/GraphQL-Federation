import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from './user.model';

@ObjectType()
@Directive('@key(fields: "id")')
export class Todo {
  @Field((type) => ID)
  id: number;

  @Field()
  userId: number;

  @Field()
  title: string;

  @Field()
  completed: boolean;
  
  @Field((type) => User)
  user?: User;

  constructor(todo: Partial<Todo>) {
    Object.assign(todo);
  }
}
