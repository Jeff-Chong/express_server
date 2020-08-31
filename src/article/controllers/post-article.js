export default function makePostArticle ({ addArticle }) {
  return async function postArticle (httpRequest) {
    const headers = {
      'Content-Type': 'application/json'
    }
    try {
      const bearerToken = httpRequest.headers.Authorization
      const authInfo = bearerToken.split(' ').pop()
      const articleInfo = httpRequest.body
      const posted = await addArticle({
        ...articleInfo,
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
