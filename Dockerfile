FROM node:17-alpine

ARG NEXT_PUBLIC_GRAPHQL_ENDPOINT
ARG NEXT_PUBLIC_SENTRY_DSN
ARG NEXT_PUBLIC_RELEASE
ARG SENTRY_AUTH_TOKEN

ENV NEXT_PUBLIC_GRAPHQL_ENDPOINT=${NEXT_PUBLIC_GRAPHQL_ENDPOINT}
ENV NEXT_PUBLIC_SENTRY_DSN=${NEXT_PUBLIC_SENTRY_DSN}
ENV NEXT_PUBLIC_RELEASE=${NEXT_PUBLIC_RELEASE}
ENV SENTRY_AUTH_TOKEN=${SENTRY_AUTH_TOKEN}

RUN mkdir /code
WORKDIR /code

COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm ci --only=production
COPY . .

# https://nextjs.org/docs/messages/sharp-missing-in-production
RUN npm i sharp

RUN npm run build

CMD [ "npm", "start" ]