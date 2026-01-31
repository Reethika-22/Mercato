const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
require("dotenv").config()

const authRoutes = require("./routes/auth.js")
const productRoutes = require("./routes/product.js")
const cartRoutes = require("./routes/cart.js")

const app = express()
const port = 4000

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Mongoose Settings (recommended)
mongoose.set("strictQuery", true)

// Routes
app.use("/api", authRoutes)
app.use("/api/product", productRoutes)
app.use("/api/cart", cartRoutes)

app.get("/", (req, res) => {
  res.json({ message: "Server is running" })
})

/* ================= DB CONNECTION + SERVER START ================= */

mongoose.connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("✅ Database connected successfully")

    app.listen(port, () => {
      console.log(`🚀 Server running on port ${port}`)
    })
  })
  .catch((err) => {
    console.error("❌ Database connection failed:", err)
  })

/* ================= OPTIONAL: DEBUG CONNECTION STATUS ================= */

mongoose.connection.on("connected", () => {
  console.log("📦 Mongoose connected to DB")
})

mongoose.connection.on("error", (err) => {
  console.log("⚠️ Mongoose connection error:", err)
})

mongoose.connection.on("disconnected", () => {
  console.log("❌ Mongoose disconnected")
})
