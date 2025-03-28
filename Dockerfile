FROM node:16
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent 
COPY . .
EXPOSE 3000
CMD ["node", "index.js"]
