FROM node:20-alpine

WORKDIR /app

COPY package*.json /app

RUN npm install

COPY . .

USER node

CMD ["npm", "run", "dev"]