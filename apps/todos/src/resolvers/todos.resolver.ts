import {
  Args,
  Int,
  Parent,
  Query,
  ResolveField,
  Resolver,
  ResolveReference,
} from '@nestjs/graphql';
import { ITodo } from '../interfaces/todo.interface';

import { Todo } from '../models/todo.model';
import { User } from '../models/user.model';
import { HttpProvider } from '../providers/http.provider';

@Resolver((of) => Todo)
export class TodosResolver {
  constructor(private httpProvider: HttpProvider) {}

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }) {
    switch (reference.__typename) {
      case Todo.name:
        return this.getTodo(Number(reference.id));
      default:
        return null;
    }
  }

  @Query((returns) => Todo, { name: 'todo' })
  async getTodo(@Args('id', { type: () => Int }) id: number): Promise<Todo> {
    return (await this.httpProvider.request<ITodo>(`todos/${id}`)).data;
  }

  @Query((returns) => [Todo], { name: 'todos' })
  async getTodos(): Promise<Todo[]> {
    return (await this.httpProvider.request<ITodo[]>('todos')).data;
  }

  @ResolveField((of) => User, { name: 'user' })
  getUser(@Parent() todo: Todo) {
    return { __typename: User.name, id: todo.userId };
  }
}
