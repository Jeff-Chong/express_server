export default function makeDeleteArticle ({ removeArticle }) {
  return async function deleteArticle (httpRequest) {
    const headers = {
      'Content-Type': 'application/json'
    }
    try {
      const bearerToken = httpRequest.headers.Authorization
      const authInfo = bearerToken.split(' ').pop()
      const id = httpRequest.params.id
      const deleted = await removeArticle({ id, authInfo })
      return {
        headers,
        statusCode: 200,
        body: deleted
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
