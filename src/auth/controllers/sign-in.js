export default function makeSignIn ({ listUser }) {
  return async function signIn (httpRequest) {
    const headers = {
      'Content-Type': 'application/json'
    }
    try {
      const userInfo = httpRequest.body
      const token = await listUser(userInfo)
      return {
        headers,
        statusCode: 200,
        body: token
      }
    } catch (e) {
      // console.log('sign-in controller e: ', e)
      return {
        headers,
        statusCode: 400,
        body: {
          error: e.message
        }
      }
    }
  }
}
