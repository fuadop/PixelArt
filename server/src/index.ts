const port = process.env.PORT || 8080;
import { GraphQLServer, PubSub } from "graphql-yoga";
import { connect } from "mongoose";
import Room from "./models/Room";
import Query from "./resolvers/Query";
import Mutation from "./resolvers/Mutation";
import Subscription from "./resolvers/Subscription";

const server = new GraphQLServer({
    typeDefs: "./src/schema.graphql", 
    resolvers: {
        Query,
        Mutation,
        Subscription,
    },
    context: {
        Room,
        pb: new PubSub()
    }
});

connect("mongodb://localhost:27017/typinggame", {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
    console.log("Connected to database");
    server.start({port}).then(() => console.log("Server started at http://localhost:" + port));
}).catch(err => console.log("Couldn't connect to database: \n" + err));