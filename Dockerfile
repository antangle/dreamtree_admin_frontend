FROM node:alpine

WORKDIR /app

COPY package*.json ./

RUN yarn install

EXPOSE 3000


COPY . .

RUN yarn build

CMD ["yarn", "serve", "-s", "dist"]