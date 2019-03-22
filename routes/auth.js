//login and signup routes
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');

// Route for signup
router.post('/signup', (req, res) => {
  // see if email is already in the database
  // User model, findOne
  User.findOne({ email: req.body.email }, (err, user) => {
    // if yes, return an error
    if (user) {
      res.status(409).json({ type: 'error', message: 'email already exists' });
    } else {
      // if no, create the user in the db
      let user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
      });
      user.save((err, user) => {
        if (err) {
          res
            .status(400)
            .json({ type: 'error', message: 'database error creating user' });
        } else {
          // sign a token (this is the login step)
          // The toObject() takes the password out
          var token = jwt.sign(user.toObject(), process.env.JWT_SECRET, {
            expiresIn: '1d',
          });
          // return token
          res.status(200).json({
            type: 'success',
            message: 'signup successful',
            user: user.toObject(),
            token,
          });
        }
      });
    }
  });
});

// Route for login
router.post('/login', (req, res) => {
  // Find user in database
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      // if no user, return error
      res.status(404).json({ type: 'error', message: "email doesn't exist" });
    } else {
      // if user, check authentication
      if (user.authenticated(req.body.password)) {
        // if authenticated, sign a token (login)
        var token = jwt.sign(user.toObject(), process.env.JWT_SECRET, {
          expiresIn: '1d',
        });
        // return the token
        res.json({
          type: 'success',
          message: 'login successful',
          user: user.toObject(),
          token,
        });
      } else {
        res.json({ type: 'error', message: 'authentication failure' });
      }
    }
  });
});

// Route for token validation
router.post('/me/from/token', (req, res) => {
  // make sure they sent us a token to check
  let token = req.body.token;
  if (!token) {
    // If no token, return error
    res
      .status(401)
      .json({ type: 'error', message: 'you must pass a valid token' });
  } else {
    // If token, verify it
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        // If invalid, return an error
        res.status(401).json({
          type: 'error',
          message: 'invalid token, please login again',
        });
      } else {
        // If token is valid...
        // look up user in the database
        User.findById(user._id, (err, user) => {
          if (err) {
            // if user doesn't exist, return an error
            res.status(404).json({
              type: 'error',
              message: 'database error during validation',
            });
          } else {
            // If user exists, send user and token back to React
            res.json({ type: 'success', user: user.toObject(), token });
          }
        });
      }
    });
  }
});

// Route for logout

module.exports = router;
