export default function makePatchItem ({ editItem }) {
  return async function patchItem (httpRequest) {
    const headers = {
      'Content-Type': 'application/json'
    }
    try {
      const bearerToken = httpRequest.headers.Authorization
      const authInfo = bearerToken.split(' ').pop()
      const itemInfo = httpRequest.body
      const toEdit = {
        ...itemInfo,
        authInfo,
        id: httpRequest.params.id
      }
      const patched = await editItem(toEdit)
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
