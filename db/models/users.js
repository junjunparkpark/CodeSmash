var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var userSchema = new Schema(
  {
    'id': String,
    'email': String,
    'hash': String,
    'image_url': String,
    'url': String,
    'first_name': String,
    'last_name': String,
    'company': String,
    'title': String,
    'location': {
      'city': String,
      'state': String
    },
    'interviews': [
      {
        'date': { type: Date, default: Date.now },
        'start_time': String,
        'room_url': String,
        'interviewee': String,
        'code': [
          {
            'time': String,
            'code_snippet': String
          }
        ]
      }
    ]
  }
);

var Users = mongoose.model('Users', userSchema);

var selectAll = (callback) => {
  Users.find({}, (err, users) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, users);
    }
  });
};

// implement a insertUser function
var insertUser = (data, callback) => {
  Users.create(user, (err, res) => {
    if (err) { 
      callback(err);
    } else {
      callback(res);
    }
  });
};

// Implement a findUser function
var findUser = (email, callback) => {
  Users.find({email: email}, (err, user) => {
    if (err) {
      callback(err);
    } else {
      callback(user);
    }
  });
};

module.exports = Users;
module.exports.selectAll = selectAll;