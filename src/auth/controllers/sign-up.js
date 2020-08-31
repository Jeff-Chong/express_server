export default function makeSignUp ({ addUser }) {
  return async function signUp (httpRequest) {
    const headers = {
      'Content-Type': 'application/json'
    }
    try {
      const userInfo = httpRequest.body
      const registered = await addUser(userInfo)
      return {
        headers,
        statusCode: 201,
        body: { registered }
      }
    } catch (e) {
      // console.log('sign-up controller e: ', e)
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
