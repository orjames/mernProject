require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const expressJWT = require('express-jwt');
const RateLimit = require('express-rate-limit');
const helmet = require('helmet');
const cloudinary = require('cloudinary');
const formData = require('express-form-data');
const cors = require('cors');
const { CLIENT_ORIGIN } = require('./config');

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(helmet());

// image stuff below
// configuring cloudinary to user specific cloud name, API_KEY, and API_SECRET
cloudinary.config({
  cloud_name: 'orjames',
  api_key: process.env.REACT_APP_CLOUDINARY_API_KEY,
  api_secret: process.env.REACT_APP_CLOUDINARY_API_SECRET,
});

app.use(
  cors({
    origin: CLIENT_ORIGIN,
  })
);

app.use(formData.parse());

app.get('/wake-up', (req, res) => res.send('👌'));

// POST /image-upload posts the image
app.post('/image-upload', (req, res) => {
  const values = Object.values(req.files);
  const promises = values.map((image) =>
    cloudinary.uploader.upload(image.path)
  );

  Promise.all(promises)
    .then((results) => res.json(results))
    .catch((err) => res.status(400).json(err));
});
// image stuff above

// Limits how many times a user may attempt to login within a defined window
const loginLimiter = new RateLimit({
  windowMs: 5 * 60 * 1000, // 5 mins
  max: 4, // login attempts
  delayMs: 0, // disables
  message: 'max login attempts exceeded (begone hacker!)',
});

// Limits how many times a user may attempt to signup within a defined window
const signupLimiter = new RateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3,
  delayMs: 0, // disabled
  message: 'max number of accounts created please try later (begone hacker!)',
});

// connects to the MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
const db = mongoose.connection;
db.once('open', () => {
  console.log(`Connected to mongo on ${db.host}:${db.port}`);
});
db.on('error', (err) => {
  console.log(`database error:\n${err}`);
});

app.use('auth/login', loginLimiter);
app.use('/auth/signup', signupLimiter);

app.use('/index', require('./routes/index'));
app.use('/auth', require('./routes/auth'));
app.use('/profile', require('./routes/profile'));
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
