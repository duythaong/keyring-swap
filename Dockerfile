FROM node:14-alpine AS builder

WORKDIR /app/bacoor-swap
RUN apk update && \
    apk add git
COPY . .
RUN yarn install && yarn build

# nginx server hosting simple static content
FROM nginx:1.12-alpine
COPY --from=builder /app/bacoor-swap/build /var/www
COPY ./etc/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]








