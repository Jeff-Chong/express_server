export default function makePostBlog ({ addBlog }) {
  return async function postBlog (httpRequest) {
    const headers = {
      'Content-Type': 'application/json'
    }
    try {
      const bearerToken = httpRequest.headers.Authorization
      const authInfo = bearerToken.split(' ').pop()
      const blogInfo = httpRequest.body
      const posted = await addBlog({
        ...blogInfo,
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
