require("dotenv").config()
const express = require('express');
const cors = require('cors')
import models, { connectDb } from './models.js';
import routes from './routes.js';
const bodyParser = require('body-parser')


const app = express();

// * Application-Level Middleware * //



// Built-In Middleware
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }));

// Custom Middleware
//allow OPTIONS on all resources
app.options('*', cors())

app.use(async (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  // req.context = {
  //   models,
  //   me: await models.User.findByLogin('rwieruch'),
  // };
  next();
});

// * Routes * //

app.use('/session', routes.session);
app.use('/users', routes.user);
app.use('/register', routes.register);
app.use('/login', routes.login);

// * Start * //

const eraseDatabaseOnSync = true;

// connectDb().then(async () => {
//   if (eraseDatabaseOnSync) {
//     await Promise.all([
//       models.User.deleteMany({}),
//       models.Message.deleteMany({}),
//     ]);

//   }

  app.listen(process.env.PORT || 8080, () =>
    console.log(`Example app listening on port ${process.env.PORT}!`),
  );
// });

