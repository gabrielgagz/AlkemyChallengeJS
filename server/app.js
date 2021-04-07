'use-strict'

const bodyParser = require('body-parser');
const app = require('./helpers/express');
const cors = require('cors');
const port = process.env.PORT || 4000;

// Allow cors
app.use(cors());

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

// Controllers
const usersRoutes = require('./controllers/users');
const movementsRoutes = require('./controllers/movements');