import {
  Args,
  ID,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Context,
  Resolver,
} from '@nestjs/graphql';
import { Request } from './models/request.model';
import { RequestInput } from './inputs/request.input';
import { ObjectsService } from './objects.service';
import { UseGuards } from '@nestjs/common';
import { JwtGuard } from './auth/jwt.guard';
import { RequestUser } from './auth/request.user.interface';

@Resolver('Request')
export class ObjectsResolver {
  constructor(private readonly service: ObjectsService) {}

  @Query('getRequest')
  async getRequest(@Args({ name: 'id', type: () => ID }) id: number) {
    return await this.service.find(id);
  }

  @Query('getRequests')
  async getRequests() {
    return await this.service.findAll();
  }

  @Mutation('createRequest')
  @UseGuards(JwtGuard)
  async create(@Args('input') input: RequestInput, @Context('req') req: RequestUser) {
    return await this.service.create(input, req.user);
  }

  @Mutation('updateRequest')
  @UseGuards(JwtGuard)
  async update(@Args('input') input: RequestInput, @Context('req') req: RequestUser) {
    return await this.service.update(input, req.user);
  }

  @Mutation('deleteRequest')
  @UseGuards(JwtGuard)
  async delete(@Args({ name: 'id', type: () => ID }) id: number, @Context('req') req: RequestUser) {
    return await this.service.delete(id, req.user);
  }

  @ResolveField('user')
  user(@Parent() request: Request): any {
    return { __typename: 'User', id: request.userId };
  }
}
