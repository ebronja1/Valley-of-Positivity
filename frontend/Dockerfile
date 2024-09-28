# Use the official Node.js image to build the React app
FROM node:18 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and install dependencies using npm
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of your application code
COPY . .

# Build the React app
RUN npm run build

RUN npm install -g serve

EXPOSE 80

#CMD [ "npm", "start" ]
CMD serve -s build -p 80

