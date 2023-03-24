import { ErrorResponse } from '../../../utils/handleErrorModels'

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
  getUsers(): Promise<IGetUserById[] | ErrorResponse>
  insertUser(user: IInsertUser): Promise<IInsertUser | ErrorResponse>
  getUserById(id: string): Promise<IGetUserById | ErrorResponse>
  updateUserById(
    id: string,
    user: IInsertUser
  ): Promise<IGetUserById | ErrorResponse>
}
