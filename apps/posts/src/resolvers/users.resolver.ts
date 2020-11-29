import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { User } from '../models/user.model';
import { PostsService } from '../services/posts.service';
import { Post } from '../models/post.model';

@Resolver((of) => User)
export class UsersResolver {
  constructor(private readonly postsService: PostsService) {}

  @ResolveField((of) => [Post], { name: 'posts' })
  public getPosts(@Parent() user: User): Post[] {
    return this.postsService.forUser(Number(user.id));
  }
}
