import 'dotenv/config'

export const propertiesConectionDB = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USERNAME,
  database: process.env.MYSQL_DATABASE,
  password: process.env.MYSQL_PASSWORD,
  port: Number(process.env.MYSQL_PORT)
}

console.log(propertiesConectionDB)
