const express = require("express");
const app = express();
const port = process.env.PORT || 4000;
const cors = require("cors");
const authRouter = require("./auth/router");
const userRouter = require("./user/router");
const eventRouter = require("./event/router");

const corsMiddleware = cors();
app.use(corsMiddleware);

const jsonParser = express.json();
app.use(jsonParser);

app.use(authRouter);
app.use(userRouter);
app.use(eventRouter);

app.listen(port, () => console.log(`Listening on port ${port}!`));
