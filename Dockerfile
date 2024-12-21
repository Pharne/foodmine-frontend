# Use Node.js base image for building and running the app
FROM node:18 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

RUN npm install -g http-server
# Expose the port your app runs on
EXPOSE 8080

# Run the Angular Universal app using npm
CMD ["npm", "start"]
