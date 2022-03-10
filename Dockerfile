# syntax=docker/dockerfile:1

FROM node:16.13.2

ENV NODE_ENV=production

WORKDIR app

RUN npm run all:install

RUN npm run build

CMD [ "npm", "run", "serve" ]