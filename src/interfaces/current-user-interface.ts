export interface CurrentUserIF {
  firstName: string
  lastName: string
  email: string
  token: string | undefined
  username: string
  realm_access?: {
    roles: string[]
  }
}
