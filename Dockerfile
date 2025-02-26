FROM node:22.2.0

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3001
EXPOSE 3002

CMD ["npm", "run", "start:prd"]
