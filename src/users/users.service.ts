import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Injectable()
export class UsersService {
  private readonly user = [
    {
      id: 1,
      username: 'max',
      password: 'secret',
    },
    {
      id: 2,
      username: 'xam',
      password: 'secret',
    },
  ];
  create(createUserInput: CreateUserInput) {
    const user = {
      ...createUserInput,
      id: this.user.length + 1,
    };
    console.log(user);
    this.user.push(user);
    return user;
  }

  findAll() {
    return this.user;
  }

  findOne(usersname: string) {
    const user = this.user.find((user) => user.username === usersname);
    if (user) {
      return user;
    }
    return null;
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
