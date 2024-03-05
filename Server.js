const jsonServer = require("./node_modules/json-server"); // importing json-server library
const server = jsonServer.create();
const router = jsonServer.router("data.json");
const middlewares = jsonServer.defaults();
const port = 8080;

server.use(middlewares);
server.use(router);

server.listen(port);
