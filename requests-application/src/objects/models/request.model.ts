import { Directive, Field, Float, ID, Int, ObjectType } from '@nestjs/graphql';
import { User } from './user.model';

@ObjectType()
@Directive('@key(fields: "id")')
export class Request {
  @Field((type) => ID)
  id: number;

  @Field()
  title: string;
  
  @Field((type) => Float)
  price: number;

  @Field((type) => Int)
  userId: number;
  @Field((type) => User)
  user?: User;
}
