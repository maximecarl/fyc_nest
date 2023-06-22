# esgi-nestjs


### Installation

1. Add .env in each mircoservice
``` .env
DATABASE_URL=postgres://postgres:postgres@localhost:5432/postgres
```

2. Install the dependencies and devDependencies and start the server.

```bash
# install the dependencies
npm install
```

3. Run those commands in each microservice to generate the prisma client and run the migration
```bash
## PRISMA CONCERNS ONLY MICROSERVICES WITH DATABASE (users and requests)

# generate the prisma client
npx prisma generate dev
# run the migration
npx prisma migrate dev (--name init) # if you want to add a name to the migration
```

### Run the project

1. Using npm

Use docker-compose for database
```bash
docker-compose up
```

Use npm for each microservice and the gateway
```bash
# run the users microservice
cd users-application && npm run start:dev 

# run the requests microservice
cd requests-application && npm run start:dev 

# run the gateway
cd gateway && npm run start:dev 
```

2. Using docker


Edit the gateway module to use the docker services

```typescript
// gateway/src/app.module.ts
subgraphs: [
    { name: 'users', url: 'http://users:3000/graphql' },
    { name: 'requests', url: 'http://requests:3001/graphql'}
],
```

Uncomment the microservices and the gateway in the docker-compose.yml file and run the following command

```bash
docker-compose up

#container gateway
docker-compose exec gateway npm run start:dev
```
