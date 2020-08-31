export default function makeGetItems ({ listItems }) {
  return async function getItems (httpRequest) {
    const headers = {
      'Content-Type': 'application/json'
    }
    try {
      const id = httpRequest.params.id
      const postItems = await listItems({ id })
      return {
        headers,
        statusCode: 200,
        body: postItems
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
