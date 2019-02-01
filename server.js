const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema');

// Middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// GraphQL
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

const SERVER_PORT = process.env.PORT || 8000;

app.listen(SERVER_PORT, () => console.log(`Server running on port: ${SERVER_PORT}`));