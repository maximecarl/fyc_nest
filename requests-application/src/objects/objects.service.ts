import { Injectable } from '@nestjs/common';
import { RequestInput } from './inputs/request.input';
import { User } from './users.interfaces';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class ObjectsService {
  constructor(private prisma: PrismaService) {}

  async create(requestInput: RequestInput, user: User) {
    return await this.prisma.request.create({
      data: {
        ...requestInput,
        userId: user.id
      }
    });
  }

  async update(requestInput: RequestInput, user: User) {
    if (!requestInput.id) throw new Error('Request id is missing');

    const request = await this.find(requestInput.id);

    if (!request) throw new Error('Request not found');

    if (request.userId !== user.id) throw new Error('You are not the author of this request');

    requestInput.id = undefined;

    return await this.prisma.request.update({
      where: { id: Number(request.id) },
      data: {
        ...requestInput
      }
    });
  }

  async delete(id: number, user: User) {
    const request = await this.find(id);

    if (!request) throw new Error('Request not found');

    if (request.userId !== user.id) throw new Error('You are not the author of this request');

    return await this.prisma.request.delete({
      where: { id: Number(id) }
    });
  }

  async find(id: number) {
    return await this.prisma.request.findUnique({
      where: { id: Number(id) }
    });
  }

  async findAll() {
    return await this.prisma.request.findMany();
  }

  async findByUser(userId: number) {
    return await this.prisma.request.findMany({
      where: { userId: Number(userId) }
    });
  }
}
