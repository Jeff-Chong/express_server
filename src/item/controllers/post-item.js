export default function makePostItem ({ addItem }) {
  return async function postItem (httpRequest) {
    const headers = {
      'Content-Type': 'application/json'
    }
    try {
      const bearerToken = httpRequest.headers.Authorization
      const authInfo = bearerToken.split(' ').pop()
      const itemInfo = httpRequest.body
      const posted = await addItem({
        ...itemInfo,
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
