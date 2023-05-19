require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const errorMiddleware = require("./middleware/errorMiddleware");
const router = require("../src/rutes");
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use("/api/v1", router);
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Listen in ${PORT}`);
});
