FROM node:17-alpine

RUN mkdir /code
WORKDIR /code

COPY . .

# RUN npm ci --only=production
RUN npm ci

# https://nextjs.org/docs/messages/sharp-missing-in-production
RUN npm i sharp

RUN npm run build

CMD [ "npm", "start" ]