// console.log('Hello Node.js project.');
import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import { v4 as uuidv4 } from 'uuid';

let users = {
    1: {
      id: '1',
      username: 'Robin Wieruch',
    },
    2: {
      id: '2',
      username: 'Dave Davids',
    },
    18: {
        id: '33',
        username: 'Robin Hood',
      },
  };
   
  let messages = {
    1: {
      id: '1',
      text: 'Hello World',
      userId: '1',
    },
    2: {
      id: '2',
      text: 'By World',
      userId: '2',
    },
  };

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
    req.me = users[1];
    next();
})

app.get('/users', (req, res) => {
    return res.send(Object.values(users));
  });
   
app.get('/users/:userId', (req, res) => {
    return res.send(users[req.params.userId]);
});

app.get('/messages', (req, res) => {
    return res.send(Object.values(messages));
})

app.get('/messages/:messageId', (req, res) => {
    return res.send(messages[req.params.messageId]);
})

app.post('/messages', (req, res) => {
    const id = uuidv4();
    const message = {
      id,
      text: req.body.text,
      userId: req.me.id,
    };
   
    // const date = Date.parse(req.body.date);
    // const count = Number(req.body.count);
    
    messages[id] = message;
   
    return res.send(message);
  });

app.listen(process.env.PORT, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`),
);