const express = require('express');
const cors = require('cors');

const router = require('./router');

const app = express();
const ORIGIN = 'http://localhost:5173/';
const PORT = 5000;

app.use(cors({ credentials: true, origin: ORIGIN }));
app.use(express.json());
app.use(express.static('public'));
app.use(router);

app.listen(PORT, () => {
  console.log('Server is running');
});
