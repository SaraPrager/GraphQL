const express = require('express');
const cors = require('cors');
// const jwt = require('jsonwebtoken');
// const expressJwt = require('express-jwt');
// const jwtSecret = Buffer.from('Zn8Q5tyZ/G1MHltc4F/gTkVJMlrbKiZt', 'base64');
const fs = require('fs');
const { ApolloServer, gql } = require('apollo-server-express');

const port = 3000;

// Express server
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
/*
app.use(expressJwt({
  secret: jwtSecret,
  credentialsRequired: false
}));
*/

app.get('/', (req, res) => {
  res.send('Hello World!')
});

/*
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!(email === 'fake_account@gmail.com' && password === 'fake_password')) {
    res.sendStatus(401);
    return;
  }
  const token = jwt.sign({ sub: user.id }, jwtSecret);
  res.send({ token });
});
*/

// Apollo Server
const typeDefs = gql(fs.readFileSync('./graphql/schema.graphql', { encoding: 'utf8' }));
const resolvers = require('./graphql/resolvers');
const apolloServer = new ApolloServer({ typeDefs, resolvers });
apolloServer.applyMiddleware({ app, path: '/graphql' });

app.listen(port, () => console.log(`Listening at http://localhost:${port}`));