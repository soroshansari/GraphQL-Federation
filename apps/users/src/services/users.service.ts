import { Injectable } from '@nestjs/common';

import { User } from '../models/user.model';

@Injectable()
export class UsersService {
  private users: User[] = [{ id: 1, name: 'soroosh' }];

  findOneById(userId: number): User {
    return this.users.find(({ id }) => id === userId);
  }

  add(name: string): User {
    const newUser = {
      id: this.users.length + 1,
      name,
    };
    this.users.push(newUser);
    return newUser;
  }

  getAll(): User[] {
    return this.users;
  }
}
