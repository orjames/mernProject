const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary');
require('dotenv').config();
const User = require('../models/user');
const Upload = require('../models/upload');

cloudinary.config({
  cloud_name: 'orjames',
  api_key: process.env.REACT_APP_CLOUDINARY_API_KEY,
  api_secret: process.env.REACT_APP_CLOUDINARY_API_SECRET,
});

// POST /profile/:userId/uploads - POST an upload associated with given user
router.post('/:userId/uploads', (req, res) => {
  User.findById(req.params.userId).then((user, err) => {
    let newUpload = new Upload({
      publicId: req.body.publicId,
      cloudColors: req.body.cloudColors,
      colorRec: req.body.colorRec,
      date: req.body.date,
    });
    newUpload.save((err, upload) => {
      user.uploads.push(upload);
      user.save((err, user) => {
        res.status(201).json(user);
      });
    });
  });
});

// GET /profile/:userId/uploads - GET ALL uploads associated with given user
router.get('/:userId/uploads', (req, res) => {
  console.log('hitting the get route to profile\n\n');

  User.findById(req.params.userId)
    .populate('uploads')
    .exec((err, user) => {
      if (err) {
        return res.status(500).send(err);
      } else {
        res.json(user.uploads); //res.json(user) for whole user object
      }
    });
});

// GET profile/:userId/uploads/:uid - GET ONE upload associated with specific user
router.get('/:userId/uploads/:uid', (req, res) => {
  User.findById(req.params.userId)
    .populate('uploads')
    .exec((err, user) => {
      let upload = user.uploads.find((upload) => {
        return upload._id.toString() === req.params.uid;
      });
      res.json(upload);
    });
});

module.exports = router;
