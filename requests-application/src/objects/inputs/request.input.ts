import { Field, Float, ID, InputType, Int } from "@nestjs/graphql";

@InputType()
export class RequestInput {
    @Field((type) => Int, { nullable: true })
    id?: number;

    @Field((type) => String)
    title: string;

    @Field((type) => Float)
    price: number;
}