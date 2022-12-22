FROM node:lts-alpine3.12 as build
RUN npm i -g @vue/cli-init
ENV CI=true
RUN vue create frontegg-vue -d
WORKDIR frontegg-vue

COPY src/App.vue ./src
COPY src/App.test.js ./src
COPY src/main.js ./src
COPY src/vite.config.js ./
COPY src/package.json ./

RUN npm ci
RUN npm build

