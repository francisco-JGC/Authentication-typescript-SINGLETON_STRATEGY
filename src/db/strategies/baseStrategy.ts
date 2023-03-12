import { type PoolConnection } from 'mysql2/promise'

export abstract class BaseStrategy {
  abstract execute(
    connection: PoolConnection,
    sql: string,
    values?: any[]
  ): Promise<any>
}
