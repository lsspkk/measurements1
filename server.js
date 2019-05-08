const express = require('express')
const app = express()
const passport = require('passport')
const cookieSession = require('cookie-session')
const cookieParser = require('cookie-parser')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const { body, validationResult } = require('express-validator/check')
const database = require('./database')
app.use(express.static('static'))

app.use(cookieParser())

app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000, // One day in milliseconds
  keys: ['randomstringhere', 'randomstringthere'],
  name: 'measurements1_app'
}))
app.use(passport.initialize()) // Used to initialize passport
app.use(passport.session()) // Used to persist login sessions
app.use(express.json())

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: 'http://localhost:3000/auth/google/callback'
},
(accessToken, refreshToken, user, done) => {
  done(null, user) // passes the profile data to serializeUser
}
))

// Used to stuff a piece of information into a cookie
// email saved to cooke, whole profile is too long -> empty session, id would be better
passport.serializeUser((user, done) => {
  // console.log("serialized", user.emails[0].value)
  if (process.env.MEASUREMENTS_DEFAULT_USER) {
    user = { 'emails': [{ 'value': process.env.MEASUREMENTS_DEFAULT_USER }], 'userid': '1' }
  }
  done(null, user.emails[0].value)
})
// Used to decode the received cookie and persist session
passport.deserializeUser((user, done) => {
  // console.log("deserialized", user)
  done(null, user)
})

// Middleware to check if the user is authenticated
function isUserAuthenticated (req, res, next) {
  if (process.env.MEASUREMENTS_DEFAULT_USER) {
    req.session.passport = { 'user': process.env.MEASUREMENTS_DEFAULT_USER, 'userid': '1' }
  }

  if (req.session && req.session.passport && req.session.passport.user) {
    console.log('passport ok: ', req.session.passport)
  } else {
    res.send('<a href="/auth/google">Please login!</a>')
  }
  next()
}

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080')
  res.header('Access-Control-Allow-Credentials', 'true')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept,Access-Control-Allow-Credentials')
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')
  if (req.method === 'OPTIONS') {
    res.send(200)
  } else {
    next()
  }
})

app.get('/', (req, res) => {
  res.send('<html><h1>hiho</h1><a href="/auth/google">Login</a><div></div></html>')
})

app.get('/api/v1/measure', (req, res) => {

})

app.get('/auth/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}))

// The middleware receives the data from Google and runs the function on Strategy config
app.get('/auth/google/callback', passport.authenticate('google'), (req, res) => {
  // console.log(req.user)
  if (req.user.emails[0].value) {
    req.session.passport.user = req.user.emails[0].value
    if (req.user.photos[0].value) {
      req.session.photo = req.user.photos[0].value
    }
    res.redirect('/secure')
  } else {
    res.send('<h3>Tunnistamaton käyttäjä</h3><a href="/auth/google">Kirjaudu</a>')
  }
})
app.get('/user', isUserAuthenticated, (req, res) => {
  res.send({ email: req.session.passport.user, photo: req.session.photo })
})

app.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

app.get('/secure', isUserAuthenticated, (req, res) => {
  res.cookie(req.cookie)
  res.redirect('http://localhost:8080')
  // res.send('Secure response to ' + req.session.passport.user + '<div><img src="'+req.session.photo+ '"></div>')
})

app.listen(3000, () => {
  console.log('Server is running on port 3000')
})

app.get('/group', isUserAuthenticated, (req, res) => {
  database.getGroupByMember(req.session.passport.userid).then(rows => res.send(rows))
})

app.get('/group:id', (req, res) => {
  console.log(req.session.passport.user)
  console.log('users from group:' + id)
  res.send([{ name: 'Lasse', photo: 'someplace.png', id: '987a9sd7f' }, { name: 'Johanna', photo: 'someplace2.jpg', id: 'd9s879f' }])
})

app.get('/measurement/:measurement_id', isUserAuthenticated, (req, res) => {
  database.getMeasurement(req.session.passport.userid, req.params.measurement_id).then(rows => res.send(rows))
})

app.post('/measurement/:measurement_id',
  [body('timestamp').isISO8601().toDate(),
    body('value').isNumeric().toInt()],
  isUserAuthenticated,
  (req, res, next) => {
    var errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    database.postMeasurement(req.session.passport.userid, req.params.measurement_id, req.body.value, req.body.timestamp)
      .then(ok => { res.sendStatus(200) })
      .catch(e => res.status(500).json({ errors: e.message }))
  })

app.get('/measure', isUserAuthenticated, (req, res) => {
  database.getMeasure(req.session.passport.userid).then(rows => res.send(rows))
})
