# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/job-finder

# Copy package.json and package-lock.json to the container
COPY package.json .

# Install the application dependencies
RUN npm install

# Copy the application code to the container
COPY . ./

# Expose the application port
EXPOSE $PORT

CMD ["npm", "start"]