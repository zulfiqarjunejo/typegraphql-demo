import "reflect-metadata";
import { createConnection } from "typeorm";
import { buildSchema } from "type-graphql";
import { ApolloServer } from "apollo-server";
import { BookResolver } from "./resolvers/book_resolver";

async function main() {

    const port: number = 5000;

    const connection = await createConnection()
    const schema = await buildSchema({
        resolvers: [BookResolver]
    })
    const server = new ApolloServer({ schema })
    await server.listen(port)
    console.log("Server started on port: " + port)
}

main();