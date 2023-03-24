import { Context } from '../db/context'
import { InsertStrategy } from '../db/strategies/insertStrategy'
import { SelectStrategy } from '../db/strategies/selectStrategy'
import {
  handleInternalServerError,
  handleNotFound,
  Response
} from '../utils/handleErrorModels'
import { IGetUserById, IInsertUser, IUsersModel } from './types/user'

export class UsersModel implements IUsersModel {
  async getUsers(): Promise<IGetUserById[] | Response> {
    try {
      const context = new Context(new SelectStrategy())
      return await context.execute('SELECT id, username, email FROM users', [])
    } catch (error: any) {
      return await handleInternalServerError(error.message)
    }
  }

  async insertUser(user: IInsertUser): Promise<IInsertUser | Response> {
    try {
      const context = new Context(new InsertStrategy())
      return await context.execute('INSERT INTO users SET ?', [user])
    } catch (error: any) {
      return await handleInternalServerError(error.message)
    }
  }

  async getUserById(id: string): Promise<IGetUserById | Response> {
    try {
      const context = new Context(new SelectStrategy())
      const response = await context.execute(
        'SELECT id, username, email FROM users WHERE id = ?',
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

  async updateUserById(
    id: string,
    user: IInsertUser
  ): Promise<IGetUserById | Response> {
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
