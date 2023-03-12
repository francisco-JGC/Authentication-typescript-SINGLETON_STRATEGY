import { PoolConnection } from 'mysql2/promise'
import { BaseStrategy } from './baseStrategy'

export class InsertStrategy extends BaseStrategy {
  async execute(
    connection: PoolConnection,
    sql: string,
    values: any[]
  ): Promise<any> {
    const result: any = await connection.query(sql, values)
    return result.insertId
  }
}
