FROM node:lts-alpine as build-stage
ARG VUE_APP_API_URL
ENV VUE_APP_API_URL ${VUE_APP_API_URL}

WORKDIR /app
COPY ./vue/package*.json ./
RUN npm install
COPY ./vue/ ./

RUN npm run build

# production stage
FROM nginx:stable-alpine as production-stage
COPY ./vue/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]