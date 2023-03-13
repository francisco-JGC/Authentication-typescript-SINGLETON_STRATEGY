import { Request, Response } from 'express'
import { UsersModel } from '../models/users'
export class UsersController {
  private usersModel: UsersModel = new UsersModel()

  public async getUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await this.usersModel.getUsers()
      res.status(200).json(users)
    } catch (err) {
      res.status(500).json(err)
    }
  }
  public async insertUser(req: Request, res: Response): Promise<void> {
    try {
      const user = req.body
      const result = await this.usersModel.insertUser(user)
      res.status(200).json(result)
    } catch (err) {
      res.status(500).json(err)
    }
  }
  public async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id
      const user = await this.usersModel.getUserById(id)
      res.status(200).json(user)
    } catch (err) {
      res.status(500).json(err)
    }
  }
  public async updateUserById(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id
      const user = req.body
      const result = await this.usersModel.updateUserById(id, user)
      res.status(200).json(result)
    } catch (err) {
      res.status(500).json(err)
    }
  }
}
