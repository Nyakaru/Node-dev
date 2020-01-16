const express = require('express')
const graphqlHTTP = require('express-graphql')
const schema = require('./schema')
const startDb = require('./db')
const expressPlayground =
    require('graphql-playground-middleware-express').default;
const isTokenValid = require('./validate');

// Create a context for holding contextual data
const context = async req => {
    const db = await startDb();
    const { authorization: token } = req.headers;

    return { db, token };
};

//provide resolvers
const resolvers = {
    events: async (_, context) => {
      const { db } = await context();
      return db
        .collection('events')
        .find()
        .toArray();
    },
    event: async ({ id }, context) => {
      const { db } = await context();
      return db.collection('events').findOne({ id });
    },
    editEvent: async ({ id, title, description }, context) => {
        const { db, token } = await context();
    
        const { error } = await isTokenValid(token);
    
        if (error) {
          throw new Error(error);
        }
    
        return db
          .collection('events')
          .findOneAndUpdate(
            { id },
            { $set: { title, description } },
            { returnOriginal: false },
          )
          .then(resp => resp.value);
      },
  };

  const app = express();
  app.use(
    '/graphql',
    graphqlHTTP(async (req) => ({
      schema,
      rootValue: resolvers,
      context: () => context(req)
    })),
  );
  app.get('/playground', expressPlayground({ endpoint: '/graphql' }));
  app.listen(4500);  

console.log("running 4500");