const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
const http = require('http').createServer(app);

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:8080',
    methods: ['GET', 'POST']
  }
});

const authRouter = require('./routes/auth');
const postsRouter = require('./routes/posts');
const authController = require('./controllers/authController');

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/auth', authRouter);

app.use('/posts', postsRouter);

app.get('/secret', authController.verifyUser, (req, res) => {
  return res.status(200).json('here is some secret info!');
});

if (process.env.NODE_ENV === 'production') {
  app.use('/build', express.static(path.join(__dirname, '../build/')));

  app.get('/', (req, res) =>
    res.status(200).sendFile(path.join(__dirname, '../index.html'))
  );
}

/*
Websocket
*/

io.on('connection', (socket) => {
  //console.log('WebSocket connected');
  socket.on('new post', (post) => {
    console.log('server received the new post')
    io.sockets.emit('new post', post)
  })
  socket.on('disconnect', () => {
   // console.log('Websocket: bye, bitch');
  });
});




/*
Error Handling
*/

app.get('*', (req, res) => {
  return res.status(404).json();
});

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: 'An error occurred',
  };
  const error = { ...defaultErr, ...err };
  return res.status(error.status).json(error.message);
});



http.listen(3000, () => { console.log('Listening on 3000, bitches') });
