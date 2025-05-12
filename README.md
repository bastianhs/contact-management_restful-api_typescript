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

1. Copy .env.example file to the same directory

2. Rename the file to .env

3. Run the following commands:
```shell
docker compose up

npm install

npx prisma migrate dev

npx prisma generate

npm run build

npm run start
```
