const express = require("express");
const app = express();
const port = process.env.PORT || 4000;
const cors = require("cors");

// const authRouter = require("./auth/router");

const corsMiddleware = cors();
app.use(corsMiddleware);

const jsonParser = express.json();
app.use(jsonParser);

// app.use(authRouter);

app.listen(port, () => console.log(`Listening on port ${port}!`));
