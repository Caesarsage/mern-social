import env from 'dotenv'
env.config()

export const readConfig = {
  port: process.env.PORT,
  test_port: process.env.TEST_PORT,
  MONGO_URL: process.env.MONGO_URL,
  JWT_EXPIRY: Number(process.env.JWT_EXPIRY),
  JWT_SECRET: process.env.JWT_SECRET
}