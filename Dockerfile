# DEV BUILD STEP
FROM node:8.7-alpine as devBuild
WORKDIR /usr/src/app

RUN yarn
# Copy the source and build
# Build script uses --dev flag to get the right dependencies
COPY . .
RUN yarn run build:prod

# PROD BUILD STEP
# Using latest LTS release of Node (comes with Yarn package manager by default)
FROM node:8.7-alpine

# Create an app directory on the container
WORKDIR /usr/src/app
ENV NODE_ENV=production

# Project copy build, install dependencies
COPY --from=devBuild /usr/src/app/build/app ./build/app
COPY package.json yarn.lock README.md ./
RUN yarn install --prod

# Install curl to do healthchecks
RUN apk add curl --no-cache

# Expose the container port to the OS
# docker run takes -p argument to forward this port to network
EXPOSE 3000

# Start the application
CMD [ "yarn", "start" ]

HEALTHCHECK CMD curl --silent --fail http://localhost:3000/ || exit 1
