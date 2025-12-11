# ===> Build Stage (https://www.docker.com/blog/how-to-dockerize-react-app/)
# Use the latest version of Node.js
FROM node:latest
 
# Set the working directory inside the container
WORKDIR /app
 
# Copy package.json and package-lock.json
COPY package*.json ./
 
# Install dependencies
RUN npm install
 
# Copy the rest of your application files
COPY . .
 
# Expose the port your app runs on
EXPOSE 5173
 
# Define the command to run your app
CMD ["npm", "run", "dev-exposed"]

# ===> Production Stage
# FROM nginx:latest AS production
# COPY --from=build /app/build /usr/share/nginx/html
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]