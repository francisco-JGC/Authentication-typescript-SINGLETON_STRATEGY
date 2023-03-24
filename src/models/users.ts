import { Context } from '../db/context'
import { InsertStrategy } from '../db/strategies/insertStrategy'
import { SelectStrategy } from '../db/strategies/selectStrategy'
import {
  handleInternalServerError,
  handleNotFound
} from '../utils/handleErrorModels'

export class UsersModel {
  async getUsers(): Promise<any> {
    try {
      const context = new Context(new SelectStrategy())
      return await context.execute('SELECT * FROM users', [])
    } catch (error: any) {
      return await handleInternalServerError(error.message)
    }
  }

  async insertUser(user: any): Promise<any> {
    try {
      const context = new Context(new InsertStrategy())
      return await context.execute('INSERT INTO users SET ?', [user])
    } catch (error: any) {
      return await handleInternalServerError(error.message)
    }
  }

  async getUserById(id: string): Promise<any> {
    try {
      const context = new Context(new SelectStrategy())
      const response = await context.execute(
        'SELECT * FROM users WHERE id = ?',
        [id]
      )
      if (response.length === 0) {
        return await handleNotFound()
      }

      return response[0]
    } catch (error: any) {
      return await handleInternalServerError(error.message)
    }
  }

  async updateUserById(id: string, user: any): Promise<any> {
    try {
      const context = new Context(new InsertStrategy())
      const response = await context.execute(
        'UPDATE users SET ? WHERE id = ?',
        [user, id]
      )
      if (response.affectedRows === 0) {
        return await handleNotFound()
      }

      return await this.getUserById(id)
    } catch (error: any) {
      return await handleInternalServerError(error.message)
    }
  }
}
