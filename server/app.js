'use strict';
const express = require('express');
const path = require('path');
const middleware = require('./middleware');
const routes = require('./routes');

const app = express();

// SOCKET IO TENTATIVE CODE
const server = require('http').createServer(app);
const io = require('socket.io')();

const mongoose = require('mongoose');
const Users = require('../db/models/users.js');



io.attach(server);
io.set('transports', ['websocket']);

app.use(middleware.morgan('dev'));
app.use(middleware.cookieParser());

app.use(middleware.bodyParser.urlencoded({extended: false}));
app.use(middleware.bodyParser.json());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(middleware.auth.session);
app.use(middleware.passport.initialize());
app.use(middleware.passport.session());
app.use(middleware.flash());

app.use(express.static(path.join(__dirname, '../public')));




app.use('/', routes.auth);
app.use('/api', routes.api);
// app.use('/api/profiles', routes.profiles);

io.on('connection', function (socket) {
// console.log('a user connected. Client id:', socket.id);
// console.log('Connecto to room numba', socket.rooms);
// console.log('Handshake details', JSON.stringify(socket.handshake));

  socket.on('changed_code', function (code) {
    console.log('user changed code:', code);
    socket.broadcast.emit('changed_code', code);
  });

  socket.on('executed_code', function (code) {
    console.log('Executed code:', code);
    socket.broadcast.emit('executed_code', code);
  });

  socket.on('cleared_terminal', function (code) {
    console.log('Broadcasting cleared code event!', code);
    socket.broadcast.emit('cleared_terminal');
  });

  socket.on('disconnect', function (code, stdio) {
    console.log('user disconnected...');
  });

  socket.on('error', function (error) {
    console.error('Error: ', error);
  });

  


});
module.exports = server;
