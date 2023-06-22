import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { JwtModule } from '@nestjs/jwt';
import { SecurityResolver } from './security/security.resolver';
import { RolesResolver } from './roles/roles.resolver';
import { jwtConstants } from './auth/constants';
import { JwtStrategy } from './jwt.strategy';
import { PrismaService } from 'nestjs-prisma';

@Module({
  providers: [
    PrismaService,
    UsersResolver, 
    UsersService, 
    SecurityResolver,
    RolesResolver,
    JwtStrategy,
  ],
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.expiresIn },
    }),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      typePaths: ['**/*.graphql'],
      context: ({ req, res }) => ({ req, res }),
    }),
  ],
})
export class UsersModule {}
