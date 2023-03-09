import mysql, { Pool, PoolConnection } from 'mysql2/promise'
import { propertiesConectionDB } from './config'

/* using the singleton design pattern to have a single instance of the database connection */
class Database {
  // singleton instance to the database connection
  private static instance: Database
  private pool: Pool | null = null

  private constructor() {}

  // obtain the instance of the database connection
  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database()
    }

    return Database.instance
  }

  // connect to the database
  public async connect(): Promise<PoolConnection> {
    if (!this.pool) {
      this.pool = mysql.createPool(propertiesConectionDB)
    }

    return this.pool.getConnection()
  }

  // disconnect from the database
  public async disconnect(): Promise<void> {
    if (this.pool) {
      try {
        await this.pool.end()
        console.log('Disconnected from MySQL database')
      } catch (err) {
        console.error('Error disconnecting from MySQL database', err)
      }
    }
  }
}

export default Database.getInstance()
