export default function makePostCategory ({ addCategory }) {
  return async function postCategory (httpRequest) {
    const headers = {
      'Content-Type': 'application/json'
    }
    try {
      const bearerToken = httpRequest.headers.Authorization
      const authInfo = bearerToken.split(' ').pop()
      const categoryInfo = httpRequest.body
      const posted = await addCategory({
        ...categoryInfo,
        authInfo
      })
      return {
        headers,
        statusCode: 201,
        body: { posted }
      }
    } catch (e) {
      // TODO
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
