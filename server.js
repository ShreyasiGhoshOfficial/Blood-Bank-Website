const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');
const cors = require('cors');
const connectDB = require('./config/db.js');
const path = require('path')

dotenv.config();

//mongodb connection
connectDB();

const app = express();


//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/v1/test',require('./routes/testRroute.js'))
app.use('/api/v1/auth',require('./routes/authRoute.js'))
app.use('/api/v1/inventory',require('./routes/inventoryRoutes.js'))
app.use('/api/v1/analytics',require('./routes/analyticsRoutes.js'))
app.use("/api/v1/admin", require("./routes/adminRoutes.js"));
//STATIC FOLDER
app.use(express.static(path.join(__dirname,'./client/build')));
//route
app.get('*', function (req,res) {
    res.sendFile(path.join(__dirname,'./client/build/index.html'));
    
})
//port
const PORT = process.env.PORT || 8080;

app.listen(PORT, ()=> console.log(`Server running in ${process.env.DEV_MODE} on ${process.env.PORT}`.bgBlue.white ));