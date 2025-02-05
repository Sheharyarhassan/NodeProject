const express = require('express');
const connectdb = require('./config/connectdb');
const userRoutes = require('./Routes/userRoutes'); 
const bookRoutes = require('./Routes/bookRoutes');
const genreRoutes = require('./Routes/genreRoutes');
const app = express();

app.use(express.json())

connectdb();

app.use('/api',userRoutes);

app.use('/api',bookRoutes);

app.use('/api',genreRoutes);

const port = process.env.port || 8080
app.listen(port,()=>{console.log(`Listening on Port ${port}`)})

