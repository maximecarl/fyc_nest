import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UsersService } from '../users.service';
import { RolesInput } from '../inputs/roles.input';
import { JwtGuard } from '../auth/jwt.guard';
import { UseGuards } from '@nestjs/common';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { RolesEnum } from '../auth/roles.enum';

@Resolver('User')
export class RolesResolver {
  constructor(
    private usersService: UsersService
) {}

  @Mutation()
  @Roles(RolesEnum.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  async addRoles(@Args('input') input: RolesInput) {
    return await this.usersService.addRoles(input);
  }

  @Mutation()
  @Roles(RolesEnum.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  async removeRoles(@Args('input') input: RolesInput) {
    return await this.usersService.removeRoles(input);
  }
}
