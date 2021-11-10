FROM node:13.12.0-alpine as builder

RUN apt-get install yarn

WORKDIR /app/bacoor-swap

COPY package.json ./
COPY yarn.lock ./

RUN yarn
RUN yarn build

COPY . /app/bacoor-swap

# nginx server hosting simple static content
FROM nginx:stable-alpine
EXPOSE 80
COPY --from=builder /app/bacoor-swap/build /usr/share/nginx/html