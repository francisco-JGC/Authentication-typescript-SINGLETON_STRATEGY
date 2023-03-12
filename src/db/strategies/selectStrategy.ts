import { PoolConnection } from 'mysql2/promise'
import { BaseStrategy } from './baseStrategy'

export class SelectStrategy extends BaseStrategy {
  async execute(
    connection: PoolConnection,
    sql: string,
    values: any[]
  ): Promise<any> {
    const [rows] = await connection.execute(sql, values)
    return rows
  }
}
