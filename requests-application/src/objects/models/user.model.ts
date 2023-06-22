import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { Request } from './request.model';

@ObjectType()
@Directive('@extends')
@Directive('@key(fields: "id")')
export class User {
  @Field((type) => ID)
  @Directive('@external')
  id: number;

  @Field((type) => [Request])
  requests?: Request[];
}
