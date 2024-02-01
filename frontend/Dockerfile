FROM node:20.11.0-alpine as base
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /usr/src/app
EXPOSE 3000

FROM base as prebuild
COPY package*.json ./
RUN npm ci --include=dev
COPY . .

FROM prebuild as dev
ENV NODE_ENV=development
CMD ["npm", "run", "dev"]

FROM prebuild as build
RUN npm run build

FROM base as prod
ENV NODE_ENV=production
RUN mkdir .next
COPY --from=build /usr/src/app/public/ ./public/
COPY --from=build /usr/src/app/.next/standalone/ ./
COPY --from=build /usr/src/app/.next/static/ ./.next/static/

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
