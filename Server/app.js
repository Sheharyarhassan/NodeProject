const express = require('express');
const connectdb = require('./config/connectdb');
const userRoutes = require('./Routes/userRoutes'); 
const bookRoutes = require('./Routes/bookRoutes');
const genreRoutes = require('./Routes/genreRoutes');
const app = express();
const swaggerDocs = require("./config/swaggerConfig")
const cors = require('cors');
require('dotenv').config();

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use(cors());
connectdb();

app.use('/api',userRoutes);

app.use('/api',bookRoutes);

app.use('/api',genreRoutes);
// Initialize Swagger
swaggerDocs(app);
const port = process.env.PORT || 8080
app.listen(port,()=>{console.log(`Listening on Port ${port}`)})

