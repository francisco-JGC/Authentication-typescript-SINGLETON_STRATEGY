import { Request, Response } from 'express'
import { UsersModel } from '../models/users'
import { handleInternalServerError, handleOK } from '../utils/handleErrorModels'
export class UsersController {
  private usersModel: UsersModel = new UsersModel()

  public async getUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await this.usersModel.getUsers()
      res.send(await handleOK(users))
    } catch (err: any) {
      res.send(await handleInternalServerError(err.message))
    }
  }
  public async insertUser(req: Request, res: Response): Promise<void> {
    try {
      const user = req.body
      const result = await this.usersModel.insertUser(user)
      res.send(await handleOK(result))
    } catch (err: any) {
      res.send(await handleInternalServerError(err.message))
    }
  }
  public async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id
      const user = await this.usersModel.getUserById(id)
      res.send(await handleOK(user))
    } catch (err: any) {
      res.send(await handleInternalServerError(err.message))
    }
  }
  public async updateUserById(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id
      const user = req.body
      const result = await this.usersModel.updateUserById(id, user)
      res.send(await handleOK(result))
    } catch (err: any) {
      res.send(await handleInternalServerError(err.message))
    }
  }
}
