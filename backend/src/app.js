const express = require("express");
const cors = require("cors");
require("dotenv").config();

const auth = require("./middleware/auth");

const memberRoutes = require("./routes/memberRoutes");
const bookRoutes = require("./routes/bookRoutes");
const issuanceRoutes = require("./routes/issuanceRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use(auth);

app.get("/", (req, res) => {
  res.send("Library Management API Running");
});

app.use("/member", memberRoutes);
app.use("/book", bookRoutes);
app.use("/issuance", issuanceRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});