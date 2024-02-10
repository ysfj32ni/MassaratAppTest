FROM node:21.6.1-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --silent

COPY . .


EXPOSE 3000

CMD ["npm", "run" , "dev"]