import { createYoga } from "graphql-yoga";
import { createServer } from "node:http";

import schema from "./schema";

const yoga = createYoga({
  schema: schema,
});

const server = createServer(yoga);

server.listen(4000);
