const mongoose = require('mongoose');

const dbConnetion=async()=>{
    try {
        let uri ='mongodb+srv://Deepesh:XGNPUMKO9zVBtDOe@cluster0.1uv2sf1.mongodb.net/Atulassignment?retryWrites=true&w=majority'
        await  mongoose.connect(uri,{ useNewUrlParser: true, useUnifiedTopology: true })
        console.log("db connection successfully")
    } catch (error) {
        console.log("error in db connection ",error.message);
        setTimeout(dbConnetion,5000)
        console.log('try to db connection in 5 secound')
    }
}

module.exports=dbConnetion;