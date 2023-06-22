import { Directive, Field, ID, Int, ObjectType } from '@nestjs/graphql';

export interface Request {
  id: number;
  title: string;
  price: number;
  status: string;
  userId: number;
}
