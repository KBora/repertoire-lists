// console.log('Hello Node.js project.');
import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import models from './models';

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


app.get('/session', (req, res) => {
    return res.send(req.context.models.users[req.context.me.id]);
  });
  

app.get('/users', (req, res) => {
    return res.send(Object.values(req.context.models.users));
});
   
app.get('/users/:userId', (req, res) => {
    return res.send(req.context.models.users[req.params.userId]);
});

app.get('/messages', (req, res) => {
    return res.send(Object.values(req.context.models.messages));
})

app.get('/messages/:messageId', (req, res) => {
    return res.send(req.context.models.messages[req.params.messageId]);
})

app.post('/messages', (req, res) => {
    const id = uuidv4();
    const message = {
      id,
      text: req.body.text,
      userId: req.context.me.id,
    };
   
    // const date = Date.parse(req.body.date);
    // const count = Number(req.body.count);
    
    req.context.models.messages[id] = message;
   
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
    } = req.context.models.messages;
   
    // messages now points to otherMessages, effectively
    // deleting message
    req.context.models.messages = otherMessages;
   
    return res.send(message);
});


app.put('/messages/:messageId', (req, res) => {

    let updatedMessage = {};
    // if user is allowed, update message (req.me is set my custom middleware function above)

    const messageId = req.params.messageId;
    // update message
    if (messageId && req.context.models.messages.hasOwnProperty(messageId)) {
        if (req.context.me.id === req.context.models.messages[messageId].userId) {
        updatedMessage = {
            id: req.params.messageId,
            text: req.body.text,
            userId: req.context.me.id,
        }        
        const updatedMessages = {
            ...req.context.models.messages,
            [req.params.messageId]: updatedMessage
        }            
        req.context.models.messages = updatedMessages;
        }
    }

   
    return res.send(updatedMessage);
});

app.listen(process.env.PORT, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`),
);