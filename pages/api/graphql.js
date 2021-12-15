import { ApolloServer, gql } from "apollo-server-micro";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { SchemaLink } from "@apollo/client/link/schema";
import { makeExecutableSchema } from "@graphql-tools/schema";
import ManifestAPI from "./manifest";
import slugify from "slugify";
import { sample } from "../../mocks/sample";

const typeDefs = gql`
  type Query {
    manifests: [Manifest]
    allManifests: [Manifest]
    getManifest(slug: ID): Manifest
  }

  type Manifest {
    id: String
    label: String
    slug: ID
    type: String
  }
`;

const resolvers = {
  Query: {
    allManifests: async (_, __, context) => {
      return getRootCollection();
    },
    getManifest: async (_, { slug }, context) => {
      return getRootCollection().find((manifest) => manifest.slug === slug);
    },
    manifests: async (_, __, context) => {
      return sample;
    },
  },
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const apolloServer = new ApolloServer({
  schema,
});

const startServer = apolloServer.start();

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://studio.apollographql.com"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  if (req.method === "OPTIONS") {
    res.end();
    return false;
  }

  await startServer;
  await apolloServer.createHandler({
    path: "/api/graphql",
  })(req, res);
}

export const config = {
  api: {
    bodyParser: false,
  },
};

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new SchemaLink({ schema }),
  ssrMode: true,
  ssrForceFetchDelay: 100,
});

export const getRootCollection = () =>
  fetch(
    "https://raw.githubusercontent.com/mathewjordan/can/main/public/iiif/collection/nez-perce.json"
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      return json.items.map((item) => {
        item.slug = slugify(item.label, { lower: true });
        return item;
      });
    });

export const fetcher = (query) =>
  fetch("/api/graphql", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ query }),
  })
    .then((res) => res.json())
    .then((json) => json.data);
