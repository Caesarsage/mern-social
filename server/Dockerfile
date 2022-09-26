FROM node:18
LABEL Owner 'Caesarsage'
WORKDIR /usr/api
COPY package.json .
RUN npm ci-only=production
COPY . ./
ENV PORT 5000
EXPOSE $PORT
CMD [ "npm", "run", "start" ]