FROM node:12.22.0-alpine
LABEL Maintainer="Alcides Arriola"
ENV APP_DIR weather_api
ENV TZ=America/Buenos_Aires
WORKDIR /usr/app/${APP_DIR}
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run test
RUN npm prune --production
EXPOSE 8080
CMD [ "npm" , "start" ]