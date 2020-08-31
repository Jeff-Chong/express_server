export default function makePostHero ({ addHero }) {
  return async function postHero (httpRequest) {
    const headers = {
      'Content-Type': 'application/json'
    }
    try {
      const bearerToken = httpRequest.headers.Authorization
      const authInfo = bearerToken.split(' ').pop()
      const heroInfo = httpRequest.body
      const posted = await addHero({
        ...heroInfo,
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
