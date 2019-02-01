const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');

// Middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Root value and temporary schema
const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

const root = { hello: () => 'Hello world!' };

// GraphQL
app.use('/graphql', graphqlHTTP({
    schema, // Add a new schema
    rootValue: root,
    graphiql: true
}));

const SERVER_PORT = process.env.PORT || 8000;

app.listen(SERVER_PORT, () => console.log(`Server running on port: ${SERVER_PORT}`));