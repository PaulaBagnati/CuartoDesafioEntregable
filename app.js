const express = require("express");
const http = require("http"); // importamos http de Node
const path = require("path");
const handlebars = require("express-handlebars");
const { Server } = require("socket.io"); // importamos el sever de socket.io

const { api, home } = require("./routes");

const Routes = require("./routes/index.js");
const socketManager = require("./websocket");

const app = express(); //app express
const server = http.createServer(app); //server http montado con express
const io = new Server(server); // web socket montado en el http

//------------------------------------------
app.engine("handlebars", handlebars.engine()); // registramos handlebars como motor de plantillas
app.set("views", path.join(__dirname, "/views")); // el setting 'views' = directorio de vistas
app.set("view engine", "handlebars"); // setear handlebars como motor de plantillas
//--------------------------------------------

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/static", express.static(path.join(__dirname, "public")));

// middlware del socket
app.use((req, res, next) => {
  req.io = io;

  next();
});

//rutas
app.use("/", Routes.home); // rutas de vistas
app.use("/api", Routes.api);

//app.use("/realTimeProducts", home);

// web Socket
io.on("connection", socketManager);

//Escucha en el puerto
const port = 8081;

server.listen(port, () => {
  console.log(`Express Server listening at http://localhost:${port}`);
});
