const express = require('express');
const cors = require('cors');
require('dotenv').config();

const router = require('./router');

const app = express();

app.use(cors({ credentials: true, origin: process.env.ORIGIN_CORS }));
app.use(express.json());
app.use(express.static('public'));
app.use(router);

app.listen(process.env.PORT, () => {
  console.log('Server is running');
});
