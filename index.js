const server = require("./api/server.js");

const port = 5000;
server.listen(port, function() {
  console.log("Web API listening on port 5000");
});
