"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }require('dotenv/config');
require('./clients/db');
var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _boom = require('boom'); var _boom2 = _interopRequireDefault(_boom);
var _cors = require('cors'); var _cors2 = _interopRequireDefault(_cors);
var _routes = require('./routes'); var _routes2 = _interopRequireDefault(_routes);
var _http = require('http');
var _socketio = require('socket.io');

const app = _express2.default.call(void 0, );
const server = _http.createServer.call(void 0, app);
const io = new (0, _socketio.Server)(httpServer, {
  cors: {
    origin: "https://twotea.onrender.com",
  },
});

app.use(_cors2.default.call(void 0, ));
app.use(_express2.default.json());
app.use(_express2.default.urlencoded({ extended: true }));

app.use(_routes2.default);

app.use((req, res, next) => {
  return next(_boom2.default.notFound("This route does not exist."));
});

app.use((err, req, res, next) => {
  console.log(err);

  if (err) {
    if (err.output) {
      return res.status(err.output.statusCode || 500).json(err.output.payload);
    }

    return res.status(500).json(err);
  }
});

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("notification", (data) => {
    // Broadcast the notification to all other connected clients
    socket.broadcast.emit("notification", data);
  });
});

const PORT = process.env.PORT || 4000;

server.listen(PORT, () =>
  console.log(
    "Server is up and running at:",
    `https://twotea-backend.onrender.com`
  )
);
