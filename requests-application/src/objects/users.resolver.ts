import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { ObjectsService } from './objects.service';
import { User } from './users.interfaces';

@Resolver('User')
export class UsersResolver {
  constructor(private readonly service: ObjectsService) {}

  @ResolveField('requests')
  public async requests(@Parent() user: User) {
    return await this.service.findByUser(user.id);
  }
}
