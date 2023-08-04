
import { BasicIdentityParams, BasicFetchResult } from '../baseModel';

export type UserParams = BasicIdentityParams;

export interface UserListItem {
    id: string,
    userName: string,
    email: string
}

export type UserListResultModel = BasicFetchResult<UserListItem>;