export default function makeGetBlogs ({ listBlogs }) {
  return async function getBlogs (httpRequest) {
    const headers = {
      'Content-Type': 'application/json'
    }
    try {
      const id = httpRequest.params.id
      const postBlogs = await listBlogs({ id })
      return {
        headers,
        statusCode: 200,
        body: postBlogs
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
