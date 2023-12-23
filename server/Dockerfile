FROM node:20.9-alpine

WORKDIR /var/www/html/app/server

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "run", "start"]
