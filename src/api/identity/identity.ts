
import { UserParams, UserListResultModel } from './types'

enum Api {
  GetUserList = '/api/identity/users',
}

//获取用户信息
export const getUserList = (params: UserParams) => $get<UserListResultModel, UserParams>(Api.GetUserList, params) //获取用户列表
