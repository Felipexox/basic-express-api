import dotenv from "dotenv"
import express from 'express';
import cors from 'cors';
import models, { connectDb } from './models/index.mjs';
import routes from './routes/index.mjs';
import bodyParser from 'body-parser'
import { Server } from "socket.io";
import { createServer } from 'http';

const server = createServer(app); 
const io = new Server(server);

io.on('connection', client => {
  client.on('event', data => { /* … */ });
  client.on('disconnect', () => { /* … */ });
});
server.listen(process.env.PORT);

dotenv.config()
const app = express();

// Built-In Middleware
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }));

// Custom Middleware
//allow OPTIONS on all resources
app.user(cors())

app.use(async (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  req.context = {
    models
  };
  next();
});

// * Routes * //

app.use('/session', routes.session);
app.use('/users', routes.user);
app.use('/register', routes.register);
app.use('/login', routes.login);
app.use('/posts', routes.posts)

// * Start * //

const eraseDatabaseOnSync = true;

connectDb().then(async () => {

  app.listen(process.env.PORT || 8080, () =>
    console.log(`App listening on port ${process.env.PORT}!`),
  );
});

