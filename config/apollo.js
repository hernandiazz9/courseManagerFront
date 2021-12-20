import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import fetch from "node-fetch";

const client = new ApolloClient({
   connectToDevTools:true,
   cache : new InMemoryCache(),
   link: new HttpLink({
      uri: process.env.PORT || 'http://localhost:4000/',
      fetch
   })

});

export default client;
