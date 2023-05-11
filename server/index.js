import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import schema from "./schema/schema.js";
import { graphqlHTTP } from "express-graphql";
import allowCors from "./allowedCors.js";
import cors from "cors";

dotenv.config();
const PORT = 4500 || process.env.PORT;

const app = express();

/*TODO: ADD CORS POLICY */
app.use(cors());

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true,
    //useFindAndModify: false,
  })
  .then(() => console.log("DB connection successful!"));

// Logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
    customFormatErrorFn: (err) => {
      console.error(err); // Log errors to the console
      return err;
    },
    extensions: ({ document, variables, operationName, result }) => {
      console.log(`GraphQL query: ${operationName}`, variables);
      console.log(`GraphQL response:`, result);
    },
  })
);

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
