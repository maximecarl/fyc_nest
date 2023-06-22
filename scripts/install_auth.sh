#!/bin/bash

cd users-application && npm i @nestjs/passport passport-jwt @nestjs/jwt && cd -
cd requests-application && npm i @nestjs/passport passport-jwt @nestjs/jwt && cd -
cd experiences-application && npm i @nestjs/passport passport-jwt @nestjs/jwt && cd -
rm -Rf users-application/src/users/auth && rm -rf requests-application/src/objects/auth && rm -rf experiences-application/src/objects/auth &&
cd security/ && cp -Rf auth/ ../users-application/src/users && cp -Rf auth/ ../requests-application/src/objects && cp -Rf auth/ ../experiences-application/src/objects && cd -
cd security/ && cp -f app.module.ts ../requests-application/src/app.module.ts && cp -f app.module.ts ../experiences-application/src/app.module.ts && cd -
