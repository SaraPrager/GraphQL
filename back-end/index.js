const http = require('http');
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const jwtSecret = 'fake_secret';
const { ApolloServer, gql } = require('apollo-server-express');

const users = require('./data/users.json');

const port = 3000;

// Express server
const app = express();
app.use(cors());
app.use(expressJwt({
  secret: jwtSecret,
  credentialsRequired: false,
  algorithms: ['HS256']
  // https://stackoverflow.com/questions/39239051/rs256-vs-hs256-whats-the-difference/39239395#39239395
}));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));


app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!(email === 'fake_account@gmail.com' && password === 'fake_password')) {
    res.sendStatus(401);
    return;
  }
  const token = jwt.sign({ sub: '5' }, jwtSecret);
  res.send({ token });
});

// Apollo Server
const typeDefs = gql(fs.readFileSync('./graphql/schema.graphql', { encoding: 'utf8' }));
const resolvers = require('./graphql/resolvers');
const context = ({ req, connection }) => {
  let loggedInUser;
  if (req?.user) {
    loggedInUser = req.user.sub;
  }
  if (connection?.context?.accessToken) {
    loggedInUser = jwt.verify(connection.context.accessToken, jwtSecret).sub;
  }

  if (loggedInUser) {
    return { user: users.find(user => user.id === loggedInUser) };
  }

  return {};
};
const apolloServer = new ApolloServer({ typeDefs, resolvers, context });
const httpServer = http.createServer(app);
apolloServer.installSubscriptionHandlers(httpServer);
apolloServer.applyMiddleware({ app, path: '/graphql' });

httpServer.listen(port, () => console.log(`Listening at http://localhost:${port}`));