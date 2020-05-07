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

app.delete('/messages/:messageId', (req, res) => {
    // object destructuring using new variable names
    // and the rest/spread operator

    // in this case, it assigns the [req.params.messageId] property of 'messages'
    // to new variable of 'message'
    // remaning objects in 'messages' are assigned to the variable 'otherMessages'
    // (if [req.params.messageId] does not exist in messages, then 'message' will be undefined
    // and otherMessages will be the same as message
    const {
      [req.params.messageId]: message,
      ...otherMessages
    } = messages;
   
    // messages now points to otherMessages, effectively
    // deleting message
    messages = otherMessages;
   
    return res.send(message);
});


app.put('/puttest', (req, res) => {
    return res.send(req.body);
});

app.put('/messages/:messageId', (req, res) => {

    let updatedMessage = {};
    // if user is allowed, update message (req.me is set my custom middleware function above)

    const messageId = req.params.messageId;
    // update message
    if (messageId && messages.hasOwnProperty(messageId)) {
        if (req.me.id === messages[messageId].userId) {
        updatedMessage = {
            id: req.params.messageId,
            text: req.body.text,
            userId: req.me.id,
        }        
        const updatedMessages = {
            ...messages,
            [req.params.messageId]: updatedMessage
        }            
        messages = updatedMessages;
        }
    }

   
    return res.send(updatedMessage);
});

app.get('/session', (req, res) => {
    return res.send(users[req.me.id]);
  });
  
app.listen(process.env.PORT, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`),
);