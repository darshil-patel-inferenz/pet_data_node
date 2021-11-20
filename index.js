require("dotenv").config();
const { API_PORT } = process.env;
const PORT = process.env.PORT || API_PORT;
const app = require("./app");

var mysql = require("./config/database");

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});
