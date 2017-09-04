# Using Node docker image with Yarn package manager
FROM kkarczmarczyk/node-yarn:6.9-slim

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

# Expose the container port on the OS
# The docker run command takes -p argument to foward exposed port to network
EXPOSE 3000

# Start the application
CMD [ "npm", "start" ]
