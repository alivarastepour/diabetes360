FROM node:latest

COPY . /app/

WORKDIR /app

RUN yarn

CMD [ "npm", "run","dev" ]