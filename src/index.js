// import 'dotenv/config';
 
// console.log('Hello Node.js project.');
 
// console.log(process.env.MY_SECRET);

import express from 'express';
 
const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!');
  });

app.get('/example', (req, res) => {
    res.send('Hello example!');
  });

app.listen(3000, () =>
  console.log('Example app listening on port 3000!'),
);