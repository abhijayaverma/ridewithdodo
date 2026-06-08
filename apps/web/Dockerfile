FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
COPY apps/web/package.json apps/web/package.json
RUN npm install

FROM deps AS build
COPY . .
RUN npm run build --workspace @ridesharex/web

EXPOSE 3000
CMD ["npm", "run", "start", "--workspace", "@ridesharex/web"]
