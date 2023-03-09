import mysql, { Pool, PoolConnection } from 'mysql2/promise'
import { propertiesConectionDB } from './config'

class Database {
  private static instance: Database
  private pool: Pool | null = null

  private constructor() {}

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database()
    }

    return Database.instance
  }

  public async connect(): Promise<PoolConnection> {
    if (!this.pool) {
      this.pool = mysql.createPool(propertiesConectionDB)
    }

    return this.pool.getConnection()
  }

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
