'use-strict'

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 4000;

app.use(bodyParser.json());

app.use(
    bodyParser.urlencoded({
    extended: true,
    })
);

app.get('/', (request, response) => {
    response.json({ info: 'Finances App API' })
});

app.listen(port, () => {
    console.log(`Finances App running on port ${port}.`)
});