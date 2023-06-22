import { Field, Float, ID, InputType, Int } from "@nestjs/graphql";

@InputType()
export class RolesInput {
    @Field((type) => Int)
    userId: number;

    @Field(type => [String], { nullable: false })
    roles: string[];
}