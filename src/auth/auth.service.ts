import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginUserInput } from './dto/login-user-input';

@Injectable()
export class AuthService {
  async login(loginUserInput: LoginUserInput) {
    const user = await this.userService.findOne(loginUserInput.username);
    const { password, ...userwithoutpassword } = user;
    return {
      acess_token: 'JWT',
      user,
    };
  }
  constructor(private userService: UsersService) {}
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findOne(username);
    if (user && user.password === password) {
      const { password, ...userwithoutpassword } = user;
      return user;
    }
    return null;
  }
}
