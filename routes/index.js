const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary');
require('dotenv').config();

cloudinary.config({
  cloud_name: 'orjames',
  api_key: process.env.REACT_APP_CLOUDINARY_API_KEY,
  api_secret: process.env.REACT_APP_CLOUDINARY_API_SECRET,
});

//creating the test route
router.get('/cloudinary-data/:pid', function(req, res) {
  cloudinary.v2.api.resource(
    req.params.pid,
    { colors: true, quality_analysis: true },
    function(error, result) {
      res.json(result);
    }
  );
});

// POST to /index
// this takes an image file and uploads it then returns the data from that image
// router.post('/', function(req, res) {
//   console.log('\x1b[36m%s\x1b[0m', 'in index POST route for /index');
//   cloudinary.v2.uploader.upload(
//     'sample.jpg',
//     { colors: true, image_metadata: true, quality_analysis: true },
//     function(error, result) {
//       console.log(result, error);
//     }
//   );
// });

module.exports = router;
