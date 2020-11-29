import { Injectable } from '@nestjs/common';

import { User } from '../models/user.model';

@Injectable()
export class UsersService {
  private users: User[] = [{ id: 1, name: 'soroosh' }];

  findOneById(userId: number): User {
    return this.users.find(({ id }) => id === userId);
  }
}
