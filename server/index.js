import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import schema from "./schema/schema.js";
import { graphqlHTTP } from "express-graphql";
import allowCors from "./allowedCors.js";

dotenv.config();
const PORT = 4500 || process.env.PORT;

const app = express();

app.use(allowCors);

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true,
    //useFindAndModify: false,
  })
  .then(() => console.log("DB connection successful!"));

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
