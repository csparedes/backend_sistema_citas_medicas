FROM node:20-alpine3.17 as dependencies
WORKDIR /app
COPY package.json package.json
RUN yarn install --frozen-lockfile

FROM node:20-alpine3.17 as builder
WORKDIR /app
COPY --from=dependencies /app/node_modules /node_modules
COPY . .
RUN yarn build

FROM node:20-alpine3.17 as runner
WORKDIR /app
EXPOSE 3000
COPY --from=builder /app/dist /dist
CMD [ "node", "dist/main.js" ]