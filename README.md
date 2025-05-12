# Contact Management RESTful API

RESTful API for contact management app.  
Developed using Node.js runtime environment with TypeScript language.  

## Contact Management App

This app can manage:
- User account
- Contact list
- Address list

## Environments / Languages / Frameworks / Libraries

- <a href="https://nodejs.org/en">Node.js</a> 
- <a href="https://www.typescriptlang.org/">TypeScript</a> 
- <a href="https://expressjs.com/">Express.js</a> 
- <a href="https://www.prisma.io/">Prisma</a> 
- <a href="https://www.postgresql.org/">PostgreSQL</a> 
- <a href="https://zod.dev/">Zod</a> 
- <a href="https://jestjs.io/">Jest</a> 
- <a href="https://www.docker.com/">Docker</a> 

## Setup Project

You can setup the project with Docker or locally.

### Setup with Docker

This is the simple setup.  

```shell
docker compose down
docker compose build
docker compose up
docker compose exec -it backend npx prisma migrate dev
```

### Setup locally

This setup is for development.  

1. Copy .env.example file to the same directory

2. Rename the file to .env

3. Run the following commands:
   ```shell
   docker compose down
   docker compose up db
   npm install
   npx prisma migrate dev
   npx prisma generate
   npm run build
   npm run start
   ```

After running the command `npx prisma generate`, the prisma client will be generated in the `dist` folder.

When developing with typescript, you may also want to generate the prisma client in the `src` folder.  

Change the output path in the `/prisma/schema.prisma`, then run `npx prisma migrate dev` again to generate the prisma client in the `src` folder.
