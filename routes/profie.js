const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary');
require('dotenv').config();

cloudinary.config({
  cloud_name: 'orjames',
  api_key: process.env.REACT_APP_CLOUDINARY_API_KEY,
  api_secret: process.env.REACT_APP_CLOUDINARY_API_SECRET,
});

// update already uploaded images, applies changes to already uploaded images
router.get('/', function(req, res) {
  console.log('\x1b[36m%s\x1b[0m', 'in index GET route for /profile');
});

module.exports = router;
