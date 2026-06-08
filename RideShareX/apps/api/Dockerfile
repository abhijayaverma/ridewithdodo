FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
COPY apps/api/package.json apps/api/package.json
COPY packages/shared/package.json packages/shared/package.json
RUN npm install

FROM deps AS build
COPY . .
RUN npm run build --workspace @ridesharex/api

FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app .
EXPOSE 4000
CMD ["npm", "run", "start", "--workspace", "@ridesharex/api"]
