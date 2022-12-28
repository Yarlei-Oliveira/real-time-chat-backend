import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';
@ObjectType()
export class LoginResponse {
  @Field()
  acess_token: string;
  @Field()
  user: User;
}
