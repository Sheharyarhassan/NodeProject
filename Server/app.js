const express = require('express');
const connectdb = require('./config/connectdb');
const userRoutes = require('./Routes/userRoutes'); 
const bookRoutes = require('./Routes/bookRoutes');
const genreRoutes = require('./Routes/genreRoutes');
const app = express();
const swaggerDocs = require("./config/swaggerConfig")
const cors = require('cors');
const path = require("path");

require('dotenv').config();
const allowedOrigins = ['http://localhost:3001','http://localhost:3000','http://localhost:3002']; // Add your frontend URL here

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(cors({
   origin: allowedOrigins,
   credentials: true,
   methods: ['GET','PATCH', 'POST', 'PUT', 'DELETE'],
   allowedHeaders: ['Content-Type', 'Authorization']
}));
connectdb();

app.use('/api',userRoutes);

app.use('/api',bookRoutes);

app.use('/api',genreRoutes);
// Initialize Swagger
swaggerDocs(app);
const port = process.env.PORT || 8080
app.listen(port,()=>{console.log(`Listening on Port ${port}`)})

