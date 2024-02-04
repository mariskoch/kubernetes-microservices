FROM node:20.11.0-alpine as base
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /usr/src/app
EXPOSE 3000

FROM base as prebuild
ARG service=counting
COPY package*.json ./
RUN npm ci --include=dev
COPY tsconfig.json tsconfig.build.json nest-cli.json .prettierrc .eslintrc.js ./
COPY ./shared/ ./shared/
COPY ./apps/${service}/ ./apps/${service}/

FROM prebuild as dev
ARG service=counting
ENV SERVICE=${service}
ENV NODE_ENV=development
CMD npx nest start $SERVICE --watch

FROM base as prod_dependencies
COPY package*.json ./
RUN npm ci --omit=dev --include=prod

FROM prebuild as build
ARG service=counting
RUN npx nest build ${service}

FROM base as prod
ENV NODE_ENV production
COPY --from=prod_dependencies /usr/src/app/node_modules/ ./node_modules/
COPY --from=build /usr/src/app/dist/apps/${service}/* ./dist/
CMD ["node", "dist/main"]
