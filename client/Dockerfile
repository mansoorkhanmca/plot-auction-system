
FROM node:16.13.0-alpine AS builder

ENV APP_NAME=plot-auction-system

WORKDIR /app

COPY . .

RUN npm i && npm run build

FROM nginx:alpine

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=builder /app/dist/$APP_NAME/* /usr/share/nginx/html

RUN chown nginx:nginx /usr/share/nginx/html/*

ENTRYPOINT ["nginx", "-g", "daemon off;"]