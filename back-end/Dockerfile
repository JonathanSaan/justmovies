
FROM node:lts-alpine

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 17017 6379

CMD ["npm", "start"]
