export class ErrorResponse extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}


export function errorHandler(error, request, response) {
  const { statusCode = 500 } = error;
  if (!error.message)
    error.message = "Something went wrong!!!, it's not your fault but ours";
  response.status(statusCode);
  response.json({
    statusCode,
    error,
  });
}