const jwt = require('jsonwebtoken')

// Generate an Access Token for the given User ID
module.exports = { generateAccessToken: (userId) => {
  // How long will the token be valid for
  const expiresIn = '1 hour'
  // Which service issued the token
  const secret = process.env.MEASUREMENTS_AUTH_TOKEN_SECRET
  const issuer = process.env.MEASUREMENTS_AUTH_TOKEN_ISSUER
  const audience = process.env.MEASUREMENTS_AUTH_TOKEN_AUDIENCE
  const token = jwt.sign({}, secret, {
    expiresIn: expiresIn,
    audience: audience,
    issuer: issuer,
    subject: userId.toString()
  })

  return token
}}
