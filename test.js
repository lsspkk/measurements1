const express = require('express'),
  token = require('./token'),
  users = require('./users')

console.log(users.getUserById(1))
console.log(token.generateAccessToken("testuser"))
