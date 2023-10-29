//Handling uncaught error
process.on("uncaughtException", (err) => {
  // console.log("Error: " + err.message);
  // console.log("Shutting down the server due to UncaughtException");
  process.exit(1);
});

//dot env setup
require('dotenv').config({path:"./config/config.env"})
//cookies setup
const app = require('./app');
const dbConnetion = require('./utils/user.db');

//db connection
dbConnetion(process.env.DB_URL);



const PORT=process.env.PORT || 8001;
let server=app.listen(PORT,()=>{
    console.log('server is running on : ',PORT)
})

// Unhandler Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log("Error: " + err.message);
  console.log("Shutting down the server due to unhandle Rejection");
  server.close(() => {
    process.exit();
  });
});
