﻿# social media fullstack application

social media functionality web app build!!

https://memories-xyz.netlify.app

## Technologies Used

- Backend - ExpressJS
- Database - MongoDB
- Endpoint Testing - Postman and ThunderClient
- Deployment - Mongo Atlas and Heroku

## How to run in development mode

#### Prerequisites

- Have nodejs and above installed on your system
- Have mongodb installed

#### Dependencies installation and server start

- Fork and clone the repository
- cd into the server folder
- Run `npm install` on your terminal
- Run `npm run dev` on your terminal

#### Dependencies installation and client start

- Fork and clone the repository
- cd into the client folder
- Run `npm install` on your terminal
- Run `npm start` on your terminal

#### Environment Variables

- Replace the following environment variable with yours
  - `MONGO_URL`
  - `PORT`
  - `TEST_PORT`
  - `JWT_SECRET`
  - `JWT_EXPIRY`

## How to run from hosted link

- Copy the `baseUrl` hosted link []()

- Refer to [Endpoint](#endpoints) for Request Arguments requirement and endpoint to test on postman

## Error Handling

Errors are returned as JSON objects in the following format:

```json
{
  "statusCode": 404,
  "error": "not found"
}
```

The API will return four error types when requests fail:

- 400: Bad Request
- 404: Not Found
- 422: Not Processable
- 500: Internal server error

### Server Endpoints

#### GET `'/'`

- Home and welcome page

- **Request Arguments** : `None`

- **Returns** : welcome message

- **Sample** :

```json
{
  "message": ""
}
```
