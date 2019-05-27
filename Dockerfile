# DEV BUILD STEP
FROM node:10.15.3-alpine as devBuild
WORKDIR /usr/src/app

# Log the settings for NPM and Environment variables
RUN npm config ls
RUN env

# Copy the source code and build
COPY . .
RUN npm install
RUN npm run build

# PROD BUILD STEP
# Using latest LTS release of Node
FROM node:10.15.3-alpine

# Create an app directory on the container
WORKDIR /usr/src/app
ENV NODE_ENV=production

# Project copy build, install only prod dependencies
COPY --from=devBuild /usr/src/app/dist ./dist
COPY package.json package-lock.json README.md ./
RUN npm install --only=prod

# Install curl to do healthchecks
RUN apk add curl --no-cache

# Expose the container port to the OS
# docker run takes -p argument to forward this port to network
EXPOSE 3000

# Start the application
CMD npm run start:production

HEALTHCHECK CMD curl --silent --fail http://localhost:3000/ || exit 1
