const api = 'https://data.tmsapi.com/v1.1/movies/showings'

// Showtimes for a given zip/radius/day rarely change once published. Caching for 3 hours lets
// CloudFront (see template.yaml) absorb repeat lookups without re-hitting the TMS API.
const cacheControl = 'public, max-age=10800'

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
    headers: {
      'Content-Type': 'application/json',
      ...(upstreamResponse.ok ? { 'Cache-Control': cacheControl } : { 'Cache-Control': 'no-store' })
    },
    body
  }
}

function jsonResponse (statusCode, body) {
  return {
    statusCode,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
    body: JSON.stringify(body)
  }
}
