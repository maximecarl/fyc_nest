import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ObjectsResolver } from './objects.resolver';
import { ObjectsService } from './objects.service';
import { UsersResolver } from './users.resolver';
import { PrismaService } from 'nestjs-prisma';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      typePaths: ['**/*.graphql'],
    }),
  ],
  providers: [PrismaService, ObjectsService, ObjectsResolver, UsersResolver],
})
export class ObjectsModule {}
  