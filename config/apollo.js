import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import fetch from "node-fetch";

const client = new ApolloClient({
   connectToDevTools:true,
   cache : new InMemoryCache(),
   link: new HttpLink({
      uri: process.env.PORT_URL,
      fetch
   })

});

export default client;
