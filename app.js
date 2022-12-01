const express = require("express");
const app = express();
const PORT = 3000;
const router = require("./routes");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(router);
app.listen(PORT, () => {
  console.log(`listening to port ${PORT}`);
});
