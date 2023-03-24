import { Response } from '../../utils/handleErrorModels'

export interface IUser {
  username: string
  email: string
}

export interface IInsertUser extends IUser {
  password: string
}

export interface IGetUserById extends IUser {
  id: string
}

export interface IUsersModel {
  getUsers(): Promise<IGetUserById[] | Response>
  insertUser(user: IInsertUser): Promise<IInsertUser | Response>
  getUserById(id: string): Promise<IGetUserById | Response>
  updateUserById(
    id: string,
    user: IInsertUser
  ): Promise<IGetUserById | Response>
}
