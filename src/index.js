// console.log('Hello Node.js project.');
import 'dotenv/config';
import cors from 'cors';
import express from 'express';

import models, { sequelize } from './models';
import routes from './routes';

const app = express();

// this are express middleware functions 
app.use(cors()); // allow CORS

// These statements tell express to extract the entire body portion of an 
// incoming request stream and makes it accessible on req.body.
app.use(express.json()); // transforms body types from request object - json 
app.use(express.urlencoded({ extended: true }));// transforms body types from request object - urlencoded

// custom middleware function
// A middleware is just a JavaScript function which has access to three arguments: req, res, next.
app.use((req, res, next) => {
    req.context = {
        models,
        me: models.users[1],
    }
    next();
})

app.use('/session', routes.session);
app.use('/users', routes.user);
app.use('/messages', routes.message);

const eraseDatabaseOnSync = true;

sequelize.sync().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Example app listening on port ${process.env.PORT}!`);
    });
});