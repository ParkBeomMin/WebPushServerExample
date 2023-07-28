const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const index = require('./routes/index');
app.use('/', index);

app.listen(3000, () => console.log('WebPush Server On 3000 Port'));
