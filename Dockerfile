# Using latest LTS release of Node (comes with Yarn package manager by default)
FROM node:6.11.2-alpine

# Create an app directory on the container
WORKDIR /usr/src/app

# Project dependencies
COPY package.json yarn.lock ./

# Install app dependencies
RUN yarn install

# Bundle app source
COPY . .

# Build the app
RUN npm run build

# Expose the container port to the OS
# docker run takes -p argument to forward this port to network
EXPOSE 3000

# Start the application
CMD [ "npm", "start" ]
