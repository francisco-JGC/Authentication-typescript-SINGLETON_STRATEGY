import { Context } from '../db/context'
import { InsertStrategy } from '../db/strategies/insertStrategy'
import { SelectStrategy } from '../db/strategies/selectStrategy'

export class UsersModel {
  public async getUsers(): Promise<any> {
    const context = new Context(new SelectStrategy())
    return await context.execute('SELECT * FROM users', [])
  }

  public async insertUser(user: any): Promise<any> {
    const context = new Context(new InsertStrategy())
    return await context.execute('INSERT INTO users SET ?', [user])
  }

  public async getUserById(id: string): Promise<any> {
    const context = new Context(new SelectStrategy())
    return await context.execute('SELECT * FROM users WHERE id = ?', [id])
  }

  public async updateUserById(id: string, user: any): Promise<any> {
    const context = new Context(new InsertStrategy())
    return await context.execute('UPDATE users SET ? WHERE id = ?', [user, id])
  }
}
