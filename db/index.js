const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

const db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

var userSchema = mongoose.Schema(
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

var User = mongoose.model('User', userSchema);

var selectAll = (callback) => {
  User.find({}, (err, users) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, items);
    }
  });
};

module.exports = User;
module.exports.selectAll = selectAll;