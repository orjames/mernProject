const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: [true, 'Hello anonymous, you must enter a First Name'],
    minlength: [1, 'First Name must be between 1 and 99 characters'],
    maxlength: [99, 'First Name must be between 1 and 99 characters'],
  },
  lastName: {
    type: String,
    required: [true, 'Hello anonymous, you must enter a Last Name'],
    minlength: [1, 'Last Name must be between 1 and 99 characters'],
    maxlength: [99, 'Last Name must be between 1 and 99 characters'],
  },
  password: {
    type: String,
    required: [true, 'You must enter a password!'],
    minlength: [8, 'password must be between 10 and 128 characters'],
    maxlength: [128, 'password must be between 10 and 128 characters'],
  },
  email: {
    type: String,
    required: [true, 'You must enter a valid email!'],
    minlength: [5, 'email must be between 5 and 99 characters'],
    maxlength: [99, 'email must be between 5 and 99 characters'],
    validate: {
      validator: function(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
      },
      message: (props) => `${props.value} is not a valid email`,
    },
  },
});

// this returns an object without a password
userSchema.set('toObject', {
  transform: function(doc, ret, options) {
    // doc is the original mongoose object from database, ret is the thing that has been converted to json (means you don't have to stringify it)
    let returnJson = {
      _id: ret._id,
      email: ret.email,
      firstName: ret.firstName,
      lastName: ret.lastName,
    };
    return returnJson; //this removes the password every time we want this to be
  },
});

// making custom function authenticated
userSchema.methods.authenticated = function(password) {
  return bcrypt.compareSync(password, this.password); //this.password is the hashed password attached to the user in the database, this is the user
};

// checks if new user than hashes password before it writes it into the database
userSchema.pre('save', function(next) {
  if (this.isNew) {
    //if this.isNew means if this is a new user
    let hash = bcrypt.hashSync(this.password, 12);
    this.password = hash;
  }
  next();
});

module.exports = mongoose.model('User', userSchema);
