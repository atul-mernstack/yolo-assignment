const express = require('express')
const app=  express();
const rateLimit = require('express-rate-limit');
const userRouter = require('./router/user.router');
const session = require('express-session');
const cors = require('cors');
//Rate Limiting 
const apiCreatingAccountLimiter = rateLimit({
    windowMs: 10 * 60 * 100, // 1 minutes
    max: 1000, // limit each IP to 10 requests per windowMs
    message: {
      limiter: true,
      type: "error",
      message: 'maximum_accounts'
    }
  }); 
app.use(apiCreatingAccountLimiter);
//Json parse
app.use(express.json());
//url encode
app.use(express.urlencoded({extended:true}));
app.use(cors({
  origin:"*"
}))
app.use(
  session({
    secret: process.env.SESSION_SECRET, // Replace with a secure secret key
    resave: false,
    saveUninitialized: false,
  })
);

app.use('/api/v1',userRouter)

app.get("*",(req,res)=>{
      res.status(200).json({
        success:true,
        message:"Health check pass"
      })
})




module.exports =app;