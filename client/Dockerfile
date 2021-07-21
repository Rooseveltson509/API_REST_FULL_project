FROM node:14-slim

WORKDIR /usr/src/app

COPY ./package.json ./

RUN npm install &&\
    npm i -g @angular/cli

COPY . .

EXPOSE 4200

CMD npm run start