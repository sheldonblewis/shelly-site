// this endpoint returns your current location.
//
// options to make this work with your apple live location:
//
// 1. icloud sharing link approach:
//    - share your location via icloud (findmy → share my location)
//    - use the shared link to periodically scrape/resolve your location
//    - store the result and serve it here
//
// 2. shortcuts + webhook approach (recommended):
//    - create an apple shortcut that gets your current location
//    - have it POST to an endpoint (e.g., a simple kv store or database)
//    - run the shortcut on an automation trigger (e.g., every 30 min)
//    - read from that store here
//
// 3. manual / static fallback:
//    - just hardcode your current city below
//
// for now, this returns a static location. replace with your preferred method.

export default function handler(req, res) {
  // replace with dynamic location fetching
  const location = 'sf'

  res.status(200).json({
    location,
    updatedAt: new Date().toISOString(),
  })
}
