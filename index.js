const { ApolloServer, gql } = require("apollo-server");
const SessionAPI = require("./datasource/sessions");

const typeDefs = gql`
  type Query {
    sessions: [Session]
    sessionById(id: ID): Session
  }
  type Session {
    id: ID!
    title: String
    description: String
    startsAt: String
    endsAt: String
    room: String
    day: String
    format: String
    track: String @deprecated(reason: "Use format instead")
    level: String
  }
`;

const resolvers = {
  Query: {
    sessions: (parent, args, { dataSource }, info) => {
      return dataSource.SessionAPI.getSessions();
    },
    sessionById: (parent, { id }, { dataSource }, info) => {
      return dataSource.SessionAPI.getSessionById(id);
    },
  },
};

const dataSource = () => ({
  sessionAPI: new SessionAPI(),
});

const server = new ApolloServer({ typeDefs, resolvers, dataSource });

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
