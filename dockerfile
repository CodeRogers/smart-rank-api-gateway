FROM node:17-alpine as development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i

COPY . .

RUN npm run build 

FROM node:17-alpine as production

WORKDIR /usr/src/app

COPY --from=development /usr/src/app/package*.json ./

COPY --from=development /usr/src/app/.env ./.env

RUN npm ci

COPY --from=development /usr/src/app/dist/ ./dist/

CMD [ "node", "dist/main" ]