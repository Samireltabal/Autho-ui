import { LocalScheme } from '~auth/runtime'
export default class SocialScheme extends LocalScheme {
  async login (data) {
    this.setUserToken(data.data.token)
    const user = await this.fetchUser()
    return user
  }
}
