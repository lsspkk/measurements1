const express = require('express')
const app = express()
const passport = require('passport')
const cookieSession = require('cookie-session')
const cookieParser = require('cookie-parser')
const GoogleStrategy = require('passport-google-oauth20').Strategy

app.use(express.static('static'))

app.use(cookieParser())

app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000, // One day in milliseconds
  keys: ['randomstringhere', 'randomstringthere'],
  name: 'measurements1_app'
}))
app.use(passport.initialize()); // Used to initialize passport
app.use(passport.session()); // Used to persist login sessions


passport.use(new GoogleStrategy({
    clientID:  process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback",
  },
  (accessToken, refreshToken, user, done) => {
    done(null, user) // passes the profile data to serializeUser
  }
))

// Used to stuff a piece of information into a cookie
// email saved to cooke, whole profile is too long -> empty session, id would be better
passport.serializeUser((user, done) => {
  // console.log("serialized", user.emails[0].value)
  done(null, user.emails[0].value)
})
// Used to decode the received cookie and persist session
passport.deserializeUser((user, done) => {
  // console.log("deserialized", user)
  done(null, user)
})

// Middleware to check if the user is authenticated
function isUserAuthenticated(req, res, next) {
  console.log(req.session) // to see what passport provides
  if (req.session && req.session.passport && req.session.passport.user) {
    console.log("passport ok", req.session.passport.user)
    next()
  } 
  else {
    res.send('<a href="/auth/google">Please login!</a>')
  }
}

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:8080");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Access-Control-Allow-Credentials");
  next()
})


app.get('/', (req, res) => {
  res.send('<html><h1>hiho</h1><a href="/auth/google">Login</a><div></div></html>')
})

app.get('/auth/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}))

// The middleware receives the data from Google and runs the function on Strategy config
app.get('/auth/google/callback', passport.authenticate('google'), (req, res) => {
  //console.log(req.user)
  if( req.user.emails[0].value) {
    req.session.passport.user = req.user.emails[0].value
    if( req.user.photos[0].value ) {
      req.session.photo = req.user.photos[0].value
    }
    res.redirect('/secure')
  }
  else {
    res.send('<div>Login failed</div><a href="/auth/google">try again!</a>')
  }
})
app.get('/user', isUserAuthenticated, (req, res) => {
  res.send( {email: req.session.passport.user, photo: req.session.photo })
})


app.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

app.get('/secure', isUserAuthenticated, (req, res) => {
  res.cookie(req.cookie)
  res.redirect('http://localhost:8080');
  // res.send('Secure response to ' + req.session.passport.user + '<div><img src="'+req.session.photo+ '"></div>')
})

app.listen(3000, () => {
  console.log('Server is running on port 3000')
})

app.get('/measurement', (req, res) => {
  console.log(req.session.passport.user)
  res.send([ {name:'mood', min:0, max:10}, {name:'energy', min:0, max:10}])
})
app.get('/measurement/:name', (req, res) => {
  console.log(req.session.passport.user)
  console.log('measurements from '+name)
  res.send([ 
    {date:'2018-10-15T12:12:00.000Z', value:5},
    {date:'2018-10-15T18:12:00.000Z', value:6},
    {date:'2018-10-16T08:12:00.000Z', value:8}
  ])
})
app.get('/group', (req, res) => {
  console.log(req.session.passport.user)
  res.send([{name:'kotivoima', id:'ljlajsdf9879asd7f9879a'}])
})
app.get('/group:id', (req, res) => {
  console.log(req.session.passport.user)
  console.log('users from group:'+id)
  res.send([{name:'Lasse', photo:'someplace.png', id:'987a9sd7f'}, {name:'Johanna', photo:'someplace2.jpg', id:'d9s879f'}])
})
