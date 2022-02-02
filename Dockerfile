FROM node:17-alpine

ARG NEXT_PUBLIC_GRAPHQL_ENDPOINT

RUN mkdir /code
WORKDIR /code

COPY . .

RUN npm ci --only=production

# https://nextjs.org/docs/messages/sharp-missing-in-production
RUN npm i sharp

RUN npm run build

CMD [ "npm", "start" ]