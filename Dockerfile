# Use an official Node.js runtime as the base image
FROM node:18

#create container name
LABEL name="swanstrack-fe"

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Set a build-time argument for the container name
ARG CONTAINER_NAME=swans-track-fe

ARG DIGITALOCEAN=https://backend-swans.click
# ARG DIGITALOCEAN=http://localhost:8000
ENV DIGITALOCEAN=${DIGITALOCEAN}

# Install project dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the application code to the container
COPY . .

# Build the Next.js application
RUN npm run build

# Expose the port that the Next.js app will run on
EXPOSE 3000

# Start the Next.js app
CMD ["npm", "start"]
