export default function makeGetConstellations ({ listConstellations }) {
  return async function getConstellations (httpRequest) {
    const headers = {
      'Content-Type': 'application/json'
    }
    try {
      const postedConstellations = await listConstellations({
        consName: httpRequest.query.consName,
        type: httpRequest.query.type
      })
      return {
        headers,
        statusCode: 200,
        body: postedConstellations
      }
    } catch (e) {
      // TODO
      // console.log(e)
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
