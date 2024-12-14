require('dotenv').config();
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const path = require('path');

// Import typeDefs and resolvers
const { typeDefs, resolvers } = require('./schemas');

// Middleware
const { authMiddleware } = require('./utils/auth');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static files for production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// GraphQL Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

async function startServer() {
  await server.start();
  server.applyMiddleware({ app });

  // Connect to MongoDB
  mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/techconnect', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // Log MongoDB connection
  mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
  });

  // Start the server
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`GraphQL server ready at http://localhost:${PORT}${server.graphqlPath}`);
  });
}

startServer();
