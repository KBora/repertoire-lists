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

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
    };
   
    // const date = Date.parse(req.body.date);
    // const count = Number(req.body.count);
    
    messages[id] = message;
   
    return res.send(message);
  });

app.listen(process.env.PORT, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`),
);