FROM node:lts-alpine as build-stage
ARG VUE_APP_API_URL=${VUE_APP_API_URL}
ARG VUE_APP_GA_ID=${VUE_APP_GA_ID}
ARG VUE_APP_GA_APP_NAME=${VUE_APP_GA_APP_NAME}
ENV VUE_APP_API_URL ${VUE_APP_API_URL}

WORKDIR /app
COPY ["./package.json", "./"]
RUN npm install
COPY ["./", "./"]

RUN npm run build

# production stage
FROM nginx:stable-alpine as production-stage
COPY ["./nginx.conf", "/etc/nginx/conf.d/default.conf"]
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
