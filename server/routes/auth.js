const express = require('express');
const middleware = require('../middleware');
const fs = require('fs');
const exec = require('child_process').exec;
const path = require('path');
const Sandbox = require('sandbox');

const router = express.Router();

var sandbox = new Sandbox();

console.log('Router dealing with / endpoint...');
router.route('/')
  .get((req, res) => {
    console.log('/ route accessed!', 'rendering it to user?');
    res.render('index.ejs');
  });
  // .get(middleware.auth.verify, (req, res) => {
  //   res.render('index.ejs');
  // });

console.log('Router dealing with /run endpoint...');
router.route('/run')
  .post((req, res) => {
    console.log('req body:', req.body);
    var { code } = req.body;
    var codeFilePath = path.join(__dirname, 'code.js');
    var command = ['node', codeFilePath].join(' ');
    // console.log('Writing to:', codeFilePath);
    fs.writeFile(codeFilePath, req.body.code, 'utf8', (err) => {
      if (err) {
        throw err;
      }
      var evaluate = new Promise(function (resolve, reject) {
        var options = {
        };
        exec(command, options, function (err, stdout, stderr) {
          // console.log('Running command:', command);
          if (err) {
            console.log('I has error...');
          }
          // console.log('Error:', err, 'Stderr:', stderr.toString());
          // console.log('Stdout:', stdout.toString().split('\n'));
          var logs = stdout.toString().split('\n');
          var verboseError = stderr.toString();
          // resolve({data: stdout.toString(), error: stderr.toString()});
          sandbox.run(code, output => {
            // console.log('Sandbox output:', output);
            output = {
              result: output.result,
              logs: logs,
              error: err,
              longError: verboseError

            };
            resolve(output);
          });

        });
      })
      .then(output => {
        console.log('Output:', output);
        res.send(output);
      })
      .catch(err => {
        if (err) {
          console.log('Thrown error: ', err);
        }
        res.status(404).send('Bleh');
      });

    });
  });

router.route('/login')
  .get((req, res) => {
    res.render('login.ejs', { message: req.flash('loginMessage') });
  })
  .post(middleware.passport.authenticate('local-login', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash: true
  }));

router.route('/signup')
  .get((req, res) => {
    res.render('signup.ejs', { message: req.flash('signupMessage') });
  })
  .post(middleware.passport.authenticate('local-signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
  }));

router.route('/profile')
  .get(middleware.auth.verify, (req, res) => {
    res.render('profile.ejs', {
      user: req.user // get the user out of session and pass to template
    });
  });

router.route('/logout')
  .get((req, res) => {
    req.logout();
    res.redirect('/');
  });

router.get('/auth/google', middleware.passport.authenticate('google', {
  scope: ['email', 'profile']
}));

router.get('/auth/google/callback', middleware.passport.authenticate('google', {
  successRedirect: '/profile',
  failureRedirect: '/login'
}));

router.get('/auth/facebook', middleware.passport.authenticate('facebook', {
  scope: ['public_profile', 'email']
}));

router.get('/auth/facebook/callback', middleware.passport.authenticate('facebook', {
  successRedirect: '/profile',
  failureRedirect: '/login',
  failureFlash: true
}));

router.get('/auth/twitter', middleware.passport.authenticate('twitter'));

router.get('/auth/twitter/callback', middleware.passport.authenticate('twitter', {
  successRedirect: '/profile',
  failureRedirect: '/login'
}));

module.exports = router;
