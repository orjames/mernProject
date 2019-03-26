const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary');
require('dotenv').config();

cloudinary.config({
  cloud_name: 'orjames',
  api_key: process.env.REACT_APP_CLOUDINARY_API_KEY,
  api_secret: process.env.REACT_APP_CLOUDINARY_API_SECRET,
});

// GET /cloudinary-data/:pid, gets cloudColors from cloudinary API
router.get('/cloudinary-data/:pid', function(req, res) {
  cloudinary.v2.api.resource(
    req.params.pid,
    { colors: true, quality_analysis: true },
    function(error, result) {
      res.json(result);
    }
  );
});

module.exports = router;
