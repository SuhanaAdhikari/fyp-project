import express from "express"
import cors from "cors"
import "dotenv/config"
import connectDB from "./config/mongodb.js"
import { clerkMiddleware } from '@clerk/express'
import clerkWebhooks from "./controllers/ClerkWebhooks.js"
import userRouter from "./routes/userRoute.js"
import addressRouter from "./routes/addressRoute.js"
import cartRouter from "./routes/cartRoute.js"
import productRouter from "./routes/productRoute.js"
import connectCloudinary from "./config/cloudinary.js"
import orderRouter from "./routes/orderRoute.js"
import { stripeWebhooks } from "./controllers/stripeWebhooks.js"


await connectDB() // Establish connection to the database
await connectCloudinary() // Setup cloudinary for image storage

const app = express() // Initialize Express Application
app.use(cors()) // Enable Cross-Origin Resource sharing

// API to listen to stripe webhooks
app.post('/api/stripe', express.raw({type: "application/json"}), stripeWebhooks)

// Middleware Setup
app.use(express.json())  // Enables JSON request body parsing
app.use(clerkMiddleware())

// API to listen Clerk Webhooks
app.use("/api/clerk", clerkWebhooks)

// Define API Routes
app.use('/api/user', userRouter) // Routes for User functionality
app.use('/api/products', productRouter) // Routes for handling Products
app.use('/api/addresses', addressRouter) // Routes for handling Addresses
app.use('/api/cart', cartRouter) // Routes for handling Cart
app.use('/api/orders', orderRouter) // Routes for handling Order

// Route Endpoint to check API Status
app.get('/', (req,res)=>{
    res.send("API Successfully connected")
})

const port = process.env.PORT || 3000  // Define server port

// Start the server
app.listen(port, ()=> console.log(`Server is running at http://localhost:${port}`))