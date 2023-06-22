import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { RegisterInput } from './inputs/register.input';
import { RolesInput } from './inputs/roles.input';
import { RolesEnum } from './auth/roles.enum';
import * as bcrypt from 'bcrypt';
import { User } from './models/user.model';


@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findById(id: number): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: { id: Number(id) },
    });
  }

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email: email },
    });
  }

  async create(input: RegisterInput) {
    const password_hash = await bcrypt.hash(input.password, 10)

    return await this.prisma.user.create({
      data: {
        name: input.name,
        email: input.email,
        password: password_hash,
        roles: [],
      },
    });
  }

  async addRoles(input: RolesInput) {
    const user = await this.findById(input.userId);
    input.roles.forEach(role => {
      if (
        !user.roles.includes(role) 
        && Object.values(RolesEnum).includes(role as RolesEnum)
      ) {
        user.roles.push(role);
      }
    });

    return await this.prisma.user.update({
      where: { id: Number(input.userId) },
      data: {
        roles: {
          set: user.roles,
        },
      },
    });
  }

  async removeRoles(input: RolesInput) {
    const user = await this.findById(input.userId);
    user.roles = user.roles.filter(role => !input.roles.includes(role));

    return await this.prisma.user.update({
      where: { id: Number(input.userId) },
      data: {
        roles: {
          set: user.roles,
        },
      },
    });
  }
}
