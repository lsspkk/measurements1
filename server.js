const express = require('express'),
    app = express(),
    passport = require('passport'),
    auth = require('./auth'),
    cookieParser = require('cookie-parser'),
    cookieSession = require('cookie-session');


auth(passport);
app.use(passport.initialize());
app.use(cookieSession({
    name: 'session',
    keys: [process.env.MEASUREMENTS_COOKIE_KEY],
    maxAge: 24 * 60 * 60 * 1000
}));
app.use(cookieParser());


app.get('/', (req, res) => {
    if (req.session.token) {
        res.cookie('token', req.session.token);
        res.json({
            status: 'session cookie set'
        });
    } else {
        res.cookie('token', '')
        res.json({
            status: 'session cookie not set'
        });
    }
});

app.get('/auth/google', passport.authenticate('google', {
   scope: [ 'profile', 'email', 'https://www.googleapis.com/auth/userinfo.email']
}));

app.get('/auth/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/'
    }),
    (req, res) => {
        console.log(req.user.profile.emails[0].value);
        req.session.token = req.user.token;
        res.cookie('token', req.user.token);
        res.redirect('/');
    }
);

app.get('/logout', (req, res) => {
    req.logout();
    req.session = null;
    res.redirect('/');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});