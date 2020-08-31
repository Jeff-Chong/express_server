export default function makeDeleteItem ({ removeItem }) {
  return async function deleteItem (httpRequest) {
    const headers = {
      'Content-Type': 'application/json'
    }
    try {
      const bearerToken = httpRequest.headers.Authorization
      const authInfo = bearerToken.split(' ').pop()
      const id = httpRequest.params.id
      const deleted = await removeItem({ id, authInfo })
      return {
        headers,
        statusCode: deleted.deletedCount === 0 ? 404 : 200,
        body: { deleted }
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
