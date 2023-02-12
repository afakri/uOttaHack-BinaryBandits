FROM node:13-alpine

RUN mkdir -p /home/app

WORKDIR /home/app

COPY . .

RUN npm install

CMD ["node", "index.js"]