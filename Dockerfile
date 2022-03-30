FROM node:17-alpine

ARG RELEASE
ARG SENTRY_AUTH_TOKEN

ENV SENTRY_RELEASE=${RELEASE}
ENV NEXT_PUBLIC_RELEASE=${RELEASE}

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