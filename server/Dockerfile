FROM node:18 
WORKDIR /app

COPY package*.json ./

RUN npm install
COPY . .

RUN npm ci && npm cache clean --force
RUN npm run build