import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { ITodo } from '../interfaces/todo.interface';
import { Todo } from '../models/todo.model';
import { User } from '../models/user.model';
import { HttpProvider } from '../providers/http.provider';

@Resolver((of) => User)
export class UsersResolver {
  constructor(private httpProvider: HttpProvider) {}

  @ResolveField((of) => [Todo], { name: 'todos' })
  public async getTodos(@Parent() user: User): Promise<Todo[]> {
    console.log('user.id', user);
    return (await this.httpProvider.request<ITodo[]>(`todos?userId=${user.id}`))
      .data;
  }
}
