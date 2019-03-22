require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const expressJWT = require('express-jwt');
const RateLimit = require('express-rate-limit');
const helmet = require('helmet');

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(helmet());

const loginLimiter = new RateLimit({
  windowMs: 5 * 60 * 1000, // 5 mins
  max: 4, // login attempts
  delayMs: 0, // disables
  message: 'max login attempts exceeded (begone hacker!)',
});

const signupLimiter = new RateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3,
  delayMs: 0, // disabled
  message: 'max number of accounts created please try later (begone hacker!)',
});

mongoose.connect('mongodb://localhost/jwtAuth', { useNewUrlParser: true });
const db = mongoose.connection;
db.once('open', () => {
  console.log(`Connected to mongo on ${db.host}:${db.port}`);
});
db.on('error', (err) => {
  console.log(`database error:\n${err}`);
});

app.use('auth/login', loginLimiter);
app.use('/auth/signup', signupLimiter);

app.use('/auth', require('./routes/auth'));
app.use(
  '/locked',
  expressJWT({ secret: process.env.JWT_SECRET }).unless({ method: 'POST' }),
  require('./routes/locked')
);

app.listen(process.env.PORT, () => {
  console.log(
    '\x1b[36m%s\x1b[0m',
    `* * * ♿♿ spinning on ${process.env.PORT} ♿♿ * * *`
  );
});
