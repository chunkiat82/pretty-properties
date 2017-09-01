FROM node:8.4.0-alpine

# Set a working directory
WORKDIR /usr/src/app

COPY ./package.json .
COPY ./package-lock.json .

# Install Node.js dependencies
RUN npm install

# Build Server Dependencies
COPY ./build .
COPY ./views ./views

# Copy Client Dependencies
COPY ./public ./public

# Copy application files
CMD [ "node", "server.js" ]