import { Field, Float, ID, InputType } from "@nestjs/graphql";

@InputType()
export class RegisterInput {
    @Field((type) => String)
    name: string;

    @Field((type) => String)
    email: string;

    @Field((type) => String)
    password: string;

    @Field((type) => String)
    verifyPassword: string;
}