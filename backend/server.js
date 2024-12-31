const express = require("express");
const http = require("http");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Server } = require("socket.io");
const connectDB = require("./config/db");
require("dotenv").config();

const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: "*", // Allow frontend to connect
	},
});

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Pass Socket.IO instance to routes
app.use((req, res, next) => {
	req.io = io;
	next();
});

// Routes
app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes);

// Database Connection
connectDB();

// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
