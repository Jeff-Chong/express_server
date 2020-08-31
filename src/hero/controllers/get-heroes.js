export default function makeGetHeroes ({ listHeroes }) {
  return async function getHeroes (httpRequest) {
    const headers = {
      'Content-Type': 'application/json'
    }
    try {
      const id = httpRequest.params.id
      const postHeroes = await listHeroes({ id })
      return {
        headers,
        statusCode: 200,
        body: postHeroes
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
