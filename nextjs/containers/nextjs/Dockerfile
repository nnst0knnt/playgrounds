FROM node:22.14.0-slim

RUN apt-get update\
	&& apt-get install -y \
	openssl \
	&& apt-get autoremove -y \
	&& apt-get clean

COPY ./sources /app

WORKDIR /app

RUN npm install

USER node
