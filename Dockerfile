FROM nginx:1.17
WORKDIR app
RUN npm run all:install
RUN npm run build
CMD [ "npm", "run", "serve" ]