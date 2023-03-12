import database from './database'
import { BaseStrategy } from './strategies/baseStrategy'

export class Context {
  constructor(private strategy: BaseStrategy) {}

  async execute(sql: string, values: any[]): Promise<any> {
    const connection = await database.connect()
    const result = await this.strategy.execute(connection, sql, values)
    await database.disconnect()
    return result
  }
}
