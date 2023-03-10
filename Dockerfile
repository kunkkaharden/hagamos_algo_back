FROM node:18.12.1-alpine3.16 AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat>
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package*.json ./
RUN npm install --frozen-lockfile

# Build the app with cache dependencies
FROM node:18.12.1-alpine3.16 AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build


# Production image, copy all the files and run next
FROM node:18.12.1-alpine3.16 AS runner
WORKDIR /app
COPY package*.json ./
RUN npm install --prod
COPY --from=builder  /app/dist ./dist
COPY .env ./
COPY ./secure ./secure
CMD [ "node","./dist/index.js" ]
