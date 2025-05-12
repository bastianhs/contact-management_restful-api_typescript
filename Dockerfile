FROM node:24-alpine

WORKDIR /app

COPY . .
RUN npm install
RUN npx prisma generate
RUN npm run build

EXPOSE 4000

CMD ["npm", "run", "start"]
