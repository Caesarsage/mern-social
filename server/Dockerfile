FROM node:18
LABEL Owner 'Caesarsage'
WORKDIR /usr/api
COPY package.json .
RUN npm install
COPY . ./
ENV PORT 4000
EXPOSE $PORT
CMD [ "npm", "run", "start" ]