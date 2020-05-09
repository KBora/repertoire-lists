// console.log('Hello Node.js project.');
import 'dotenv/config';
import cors from 'cors';
import express from 'express';

import models, { sequelize } from './models';
import routes from './routes';

const app = express();

// Middleware

// Third-Party Middleware
app.use(cors()); // allow CORS

// Built-In Middleware
// These statements tell express to extract the entire body portion of an 
// incoming request stream and makes it accessible on req.body.
app.use(express.json()); // transforms body types from request object - json 
app.use(express.urlencoded({ extended: true }));// transforms body types from request object - urlencoded

// Custom middleware function
// A middleware is just a JavaScript function which has access to three arguments: req, res, next.
app.use(async (req, res, next) => {
    req.context = {
        models,
        me: await models.User.findByLogin('rwieruch'),
    }
    next();
});

// * Routes * //
app.use('/session', routes.session);
app.use('/users', routes.user);
app.use('/messages', routes.message);


// * Start * //
const eraseDatabaseOnSync = true;

sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
    if (eraseDatabaseOnSync) {
        createUsersWithMessages();
      }

    app.listen(process.env.PORT, () => {
        console.log(`Example app listening on port ${process.env.PORT}!`);
    });
});

const createUsersWithMessages = async () => {
    await models.User.create(
      {
        username: 'rwieruch',
        messages: [
            {
              text: 'Published the Road to learn React',
            },
          ],
      },
      {
        include: [models.Message],
      },
    );

    await models.User.create(
        {
          username: 'ddavids',
          messages: [
            {
              text: 'Happy to release ...',
            },
            {
              text: 'Published a complete ...',
            },
          ],
        },
        {
          include: [models.Message],
        },
      );
  };