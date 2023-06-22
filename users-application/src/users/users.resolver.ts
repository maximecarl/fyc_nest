import { Args, Context, ID, Query, Resolver, ResolveReference } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { UseGuards } from '@nestjs/common';
import { JwtGuard } from './auth/jwt.guard';
import { RequestUser } from './auth/request.user.interface';

@Resolver('User')
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query()
  async getUser(@Args({ name: 'id', type: () => ID }) id: number) {
    return await this.usersService.findById(id);
  }

  @Query("getUsers")
  async getUsers() {
    return await this.usersService.findAll();
  }

  @Query()
  @UseGuards(JwtGuard)
  async profile(@Context('req') req: RequestUser) {
    return req.user;
  }

  @ResolveReference()
  async resolveReference(reference: { __typename: string; id: number }) {
    return await this.usersService.findById(reference.id);
  }
}
