FROM node:20

WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .

EXPOSE 3500
CMD ["node", "index.js"]
