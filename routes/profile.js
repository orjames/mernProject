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

// PUT /profile/:userId - UPDATE one profile
// not in use yet, must add two more fields to user profile
// router.put('/:userId/profile', (req, res) => {
//   User.findByIdAndUpdate(
//     req.params.userId,
//     {
//       profilePicture: req.body.profilePicture,
//       bio: req.body.bio,
//     },
//     { new: true },
//     (err, profile) => {
//       if (err) {
//         return res.status(500).send(err);
//       } else {
//         return res.status(203).json(profile);
//       }
//     }
//   );
// });

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

// GET /profile/:userId/uploads/:uid - GET ONE upload associated with specific user
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

// DELETE profile/:userId/uploads/:uid - DELETE ONE upload associated with specific user
router.delete('/:userId/uploads/:uid', (req, res) => {
  console.log('in the start of delete route');
  Upload.findOneAndDelete({ _id: req.params.uid }, (err, upload) => {
    User.findById(req.params.userId, (err, user) => {
      if (err) {
        throw err;
      } else {
        console.log('in the else statement of /:userId/uploads/:uid');
        user.update({ $pull: { uploads: { _id: req.params.uid } } });
        res.status(200).json({ message: 'it wokred' });
      }
    });
  });
});

module.exports = router;
