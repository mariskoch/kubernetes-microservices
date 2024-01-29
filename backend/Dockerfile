FROM node:20.11.0-alpine as base
WORKDIR /usr/src/app
EXPOSE 3000

FROM base as prebuild
ARG service=counting
COPY package*.json ./
RUN npm ci --include=dev
COPY tsconfig.json tsconfig.build.json nest-cli.json .prettierrc .eslintrc.js ./
COPY ./apps/${service}/ ./apps/${service}/

FROM prebuild as dev
ARG service=counting
ENV SERVICE=${service}
COPY ./apps/ ./apps/
CMD npx nest start $SERVICE --watch

FROM base as prod_dependencies
COPY package*.json ./
RUN npm ci --omit=dev --include=prod

FROM prebuild as build
ARG service=counting
RUN npx nest build ${service}

FROM base as prod
COPY --from=prod_dependencies /usr/src/app/node_modules/ ./node_modules/
COPY --from=build /usr/src/app/dist/apps/${service}/* ./dist/
CMD ["node", "dist/main"]
