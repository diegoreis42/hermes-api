# Use an official Node.js runtime as a base image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the local code to the container
COPY . .

# Build the Next.js application

# Expose the port that your Next.js app will run on
EXPOSE 3001

# Define the command to run your application
CMD ["npm", "run", "start:dev"]
