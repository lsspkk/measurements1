const express = require('express'),
  app = express(),
  passport = require('passport'),
  passportJwt = require('passport-jwt'),
  auth = require('./auth'),
  token = require('./token'),
  users = require('./users')

const jwtOptions = {
  jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderWithScheme('Ratina'),
  secretOrKey: process.env.MEASUREMENTS_AUTH_TOKEN_SECRET,
  issuer: process.env.MEASUREMENTS_AUTH_TOKEN_ISSUER,
  audience: process.env.MEASUREMENTS_AUTH_TOKEN_AUDIENCE
}

passport.use(new passportJwt.Strategy(jwtOptions, (payload, done) => {
  const user = users.getUserById(payload.sub)
  if (user) {
    return done(null, user, payload)
  }
  return done()
}))

auth(passport)
app.use(passport.initialize())

app.get('/', (req, res) => {
  return 'hiho'
})

app.get('/auth/google', passport.authenticate('google', {
  scope: ['profile', 'email', 'https://www.googleapis.com/auth/userinfo.email']
}))

app.get('/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/'
  }),
  (req, res) => {
    console.log(req.user.profile.emails[0].value)
    res.json({token: token.generateAccessToken(req.user.profile.emails[0].value)})
    // todo : make refreshtoken for user
  }
)

app.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

app.get('/api/secure',
  // This request must be authenticated using a JWT, or else we will fail
  passport.authenticate(['jwt'], { session: false }),
  (req, res) => {
    res.send('Secure response from ' + JSON.stringify(req.user))
  }
)

app.listen(3000, () => {
  console.log('Server is running on port 3000')
})
