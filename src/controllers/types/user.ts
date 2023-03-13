export interface User {
  username: string
  email: string
  password: string
}

export interface UserResponse {
  username: string
  email: string
  token: string
}

export interface UserLogin {
  email: string
  password: string
}

export interface UserLoginResponse {
  email: string
  token: string
}
