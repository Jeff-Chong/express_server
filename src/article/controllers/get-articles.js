export default function makeGetArticles ({ listArticles }) {
  return async function getArticles (httpRequest) {
    const headers = {
      'Content-Type': 'application/json'
    }
    try {
      const id = httpRequest.params.id
      const postArticles = await listArticles({ id })
      return {
        headers,
        statusCode: 200,
        body: postArticles
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
