import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client"

const link = createHttpLink({
  uri: process.env.GRAPHQL_API_ENDPOINT,
  credentials: "include",
})

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
})

export default client
