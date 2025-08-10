const express = require("express");
const cors = require("cors");

// Import routes
const reservationRoutes = require("./routes/reservations");
// const authRoutes = require("./routes/auth");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// Client
app.use(express.static("client"));

// Bookink management
app.use("/admin", express.static("admin"));
app.use("/admin", express.static("client"));

// Routes
app.use("/api/reservations", reservationRoutes, express.static("client"));
// app.use("/api/auth", authRoutes);

app.listen(3000, () => console.log(`App available on http://localhost:3000`));
