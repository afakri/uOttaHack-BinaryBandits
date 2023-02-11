# Use an official Node.js runtime as the base image
FROM node:19

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the app's dependencies in the container
RUN npm install

# Copy the rest of the app's files to the container
COPY . .

# Expose the port that the app will run on
EXPOSE 3000

# Start the app
CMD [ "npm", "start" ]