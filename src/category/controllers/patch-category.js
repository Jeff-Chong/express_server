export default function makePatchCategory ({ editCategory }) {
  return async function patchCategory (httpRequest) {
    const headers = {
      'Content-Type': 'application/json'
    }
    try {
      const bearerToken = httpRequest.headers.Authorization
      const authInfo = bearerToken.split(' ').pop()
      const categoryInfo = httpRequest.body
      const toEdit = {
        ...categoryInfo,
        authInfo,
        id: httpRequest.params.id
      }
      const patched = await editCategory(toEdit)
      return {
        headers,
        statusCode: 200,
        body: { patched }
      }
    } catch (e) {
      // TODO
      if (e.name === 'RangeError') {
        return {
          headers,
          statusCode: 404,
          body: {
            error: e.message
          }
        }
      }
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
