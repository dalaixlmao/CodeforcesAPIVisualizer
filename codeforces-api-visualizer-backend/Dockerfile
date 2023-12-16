# Use a minimal Node.js image as the base image
FROM node:20

# Set the working directory inside the container
WORKDIR /codeforces-api-visualizer-backend

COPY server.js package.json package-lock.json ./

# Install production dependencies
RUN npm install --production

# Expose the port on which your application will run
EXPOSE 3000

# Define the command to run your Node.js application
CMD ["node", "server.js"]
