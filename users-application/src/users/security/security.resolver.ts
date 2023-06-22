import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UsersService } from '../users.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterInput } from '../inputs/register.input';
import * as bcrypt from 'bcrypt';

@Resolver('AuthPayload')
export class SecurityResolver {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
) {}

  @Mutation()
  async register(@Args('input') input: RegisterInput) {
    if (input.password !== input.verifyPassword) throw new Error('Passwords do not match');

    const existingUser = await this.usersService.findByEmail(input.email);
    if (existingUser)  throw new Error('Email already used');

    const user = await this.usersService.create(input);
    
    return this.getTokenFromUser(user);
  }

  @Query()
  async login(@Args({ name: 'email', type: () => String }) email: string, @Args({ name: 'password', type: () => String }) password: string) {
    const user = await this.usersService.findByEmail(email);

    if (!await bcrypt.compare(password, user.password)) throw new Error('Invalid credentials');

    return this.getTokenFromUser(user);
  }
  
  getTokenFromUser(user: any) {
    const payload = { 
      sub: user.id, 
      user: {
        'id': user.id,
        'name': user.name,
        'roles': user.roles ?? []
      }
    };

    return {
      token: this.jwtService.sign(payload)
    };
  }
}
