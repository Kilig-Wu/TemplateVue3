export interface BasicIdentityParams {
  skipCount: number
  maxResultCount: number
  filter: string
  sorting: string
}

export interface BasicFetchResult<T> {
  items: T[];
  totalCount: number;
}

export interface BasicPageParams {
  page: number;
  pageSize: number;
}

//可扩展
// export type AccountParams = BasicPageParams & {
//   account?: string;
//   nickname?: string;
// };

// export type RoleParams = {
//   roleName?: string;
//   status?: string;
// };

// export type RolePageParams = BasicPageParams & RoleParams;