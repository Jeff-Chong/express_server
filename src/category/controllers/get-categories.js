export default function makeGetCategories ({ listCategories }) {
  return async function getCategories (httpRequest) {
    const headers = {
      'Content-Type': 'application/json'
    }
    try {
      const id = httpRequest.params.id
      const query = httpRequest.query
      const postCategories = await listCategories({ id, query })
      return {
        headers,
        statusCode: 200,
        body: postCategories
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
