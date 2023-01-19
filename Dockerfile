FROM node:18.12.1-alpine3.16
WORKDIR /app
COPY . /app
RUN npm install
RUN npm run build
CMD [ "sh", "-c", "npm start"]