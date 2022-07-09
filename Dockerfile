# build
FROM node:lts-buster as build
WORKDIR /app
COPY . ./
RUN npm ci
RUN npm run build

# production
FROM nginx:1.21.4-alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
