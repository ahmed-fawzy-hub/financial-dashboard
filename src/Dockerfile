FROM node:20 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build --prod

FROM nginx:1.25

COPY --from=build /app/dist/financial-dashboard /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
