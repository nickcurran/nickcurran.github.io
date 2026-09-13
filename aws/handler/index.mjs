const api = 'https://data.tmsapi.com/v1.1/movies/showings'

export const handler = async (event) => {
  const params = event.queryStringParameters ?? {}
  const { zip, radius, startDate } = params

  if (zip == null || radius == null || startDate == null) {
    return jsonResponse(400, { error: 'zip, radius, and startDate are required' })
  }

  const upstreamUrl = `${api}?startDate=${encodeURIComponent(startDate)}&zip=${encodeURIComponent(zip)}&radius=${encodeURIComponent(radius)}&api_key=${process.env.TMS_API_KEY}`

  const upstreamResponse = await fetch(upstreamUrl)
  const body = await upstreamResponse.text()

  return {
    statusCode: upstreamResponse.status,
    headers: { 'Content-Type': 'application/json' },
    body
  }
}

function jsonResponse (statusCode, body) {
  return {
    statusCode,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  }
}
