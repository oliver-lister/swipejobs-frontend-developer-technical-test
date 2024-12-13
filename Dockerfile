# Use Node.js LTS version as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package.json package-lock.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application for production
RUN npm run build

# Expose the default port for the server
EXPOSE 4173

# Run the test coverage script and then start the production server
CMD ["sh", "-c", "npm run coverage && npm run preview -- --host"]
