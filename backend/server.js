const express = require('express');
const cors = require('cors');
const connectDB = require('../config/db')
const path = require('path')

const app = express();

// Connect with mongo database
connectDB()



app.use(cors())

app.use(express.json());

//Routes setup
const postRouter = require('./routes/doubt.route');
const interviewExpRouter = require('./routes/interview-experience.route');
const profileRouter = require('./routes/profile');
const registrationRouter = require('./routes/register')
const loginRouter = require('./routes/login')

app.use('/register',registrationRouter)
app.use('/profile',profileRouter);
app.use('/post',postRouter);
app.use('/interview',interviewExpRouter);
app.use('/',loginRouter);

// Serve static assets in production
if(process.env.NODE_ENV==='production') {
    app.use(express.static('../client/build'))
    app.get('*', ( req, res ) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const port = 5000 || process.env.PORT;

app.listen(port, ()=>{
    console.log(`server is running on port: ${port}`);
});