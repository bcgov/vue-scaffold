FROM node:16.13.12
WORKDIR app
RUN npm run all:install
RUN npm run build
CMD [ "npm", "run", "serve" ]