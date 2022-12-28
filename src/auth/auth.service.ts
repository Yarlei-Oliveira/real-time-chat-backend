import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { LoginUserInput } from './dto/login-user-input';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}
  async singup(user: LoginUserInput) {
    if (this.userService.findOne(user.username)) {
      throw new Error('Usuario ja existe');
    }
    const password = await bcrypt.hash(user.password, 10);
    return this.userService.create({
      ...user,
      password,
    });
  }

  async login(user: User) {
    return {
      acess_token: this.jwtService.sign({
        username: user.username,
        sub: user.id,
      }),
      user,
    };
  }
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findOne(username);
    const valid = await bcrypt.compare(password, user?.password);
    if (user && valid) {
      const { password, ...userwithoutpassword } = user;
      return user;
    }
    return null;
  }
}
