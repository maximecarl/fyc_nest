#!/bin/bash

cd users-application && npx prisma db pull && npx prisma migrate dev && cd -
cd requests-application && npx prisma db pull && npx prisma migrate dev && cd -
cd experiences-application && npx prisma db pull && npx prisma migrate dev && cd -