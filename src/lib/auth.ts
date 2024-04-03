import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'

export const auth = () => {
  return getKindeServerSession()
}

export const isAuthenticated = async () => {
  const { isAuthenticated } = auth()

  return await isAuthenticated()
}

export const getAccessToken = async () => {
  const { getAccessToken } = auth()

  return await getAccessToken()
}
