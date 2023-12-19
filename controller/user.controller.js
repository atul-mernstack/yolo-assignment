const User = require('../model/user.model');
class userContoller {

    constructor(){

    }

    //get user details
    async userDetails(req,res){
        try {
            const UserId = req.user._id;
            if(!UserId){
                return res.status(401).json({message:"Invalid User",success:false});
            }
            const user = await User.findById({_id:UserId});
            if(!user){
                return res.status(401).json({message:"User not Found",success:false});
            }
            res.status(200).json({
                success:true,
                user
            })
        } catch (error) {
            return res.status(500).json({message:error.message,success:false}); 
        }
    }

    // user register
    async userRegister(req,res){
        try {
           // const UserId = req.user._id;
           const {name,phone,password} = req.body;
            if(!name || !phone || !password){
               return res.status(400).json({success:false,message:"All Details are required"})
            }
            await User.create({name,phone,password});
            res.status(200).json({
                success:true,
                message:"User created successfully"
            })
        } catch (error) {
            res.status(500).json({
                success:false,
                message:error.message
            })
        }
    }


    // user login
    async  userLogin(req,res){
        try {
            const { phone, password } = req.body;

                if(!phone || !password) {
                    return res.status(400).json({success:false,message:"Please Enter Phone And Password"})
                }

                const user = await User.findOne({ phone}).select("+password");

                if(!user) {
                    return res.status(401).json({success:false,message:"Invalid Phone or Password"})
                }

                const isPasswordMatched = await user.comparePassword(password);

                if(!isPasswordMatched) {
                    return res.status(401).json({success:false,message:"Invalid phone or Password"})
                }


                // if(!user) {
                //     return res.status(401).json({success:false,message:"Invalid Phone or Password"})
                // }

                // const isPasswordMatched = await user.comparePassword(password);

                // if(!isPasswordMatched) {
                //     return res.status(401).json({success:false,message:"Invalid phone or Password"})


                const token = user.getJWTToken();
                user.sessionID=token;
                await user.save();
                let userdetails={...user}._doc;
                delete userdetails.password
                delete userdetails.sessionID
                req.session.token=token;
                res.status(200).json({
                    success: true,
                    userdetails
                });
        } catch (error) {
            res.status(500).json({
                success:false,
                message:error.message
            })
        }
    }


    // user update
    async  userUpdate(req,res){
        try {
           let user= await User.findById(req.user._id);
           const{name,phone,password} = req.body;
           if(name)
              user.name=name;
            if(phone)
               user.phone=phone;
            if(password)
            user.password =password;
            await user.save();     
            let userDetails =user;
            req.session.token=null;
            res.status(200).json({
                success:true,
                message:"User updated successfully",
                userDetails
            })
        } catch (error) {
            res.status(200).json({
                success:false,
                message:error.message
            })
        }
    }

    // user delete
    async userDelete(req,res){
        try {
            const UserId = req.user._id;
            if(!UserId){
                return res.status(401).json({success:false,message:"Invalid user"})
            }
            const user = await User.findByIdAndDelete({_id:UserId});
            req.session=null;
            res.status(200).json({
                success:true,
                message:"User deleted successfully",
                user
            })
        } catch (error) {
            res.status(500).json({
                success:false,
                message:error.message
            })
        }
    }

    // user logout
    async userLogout(req,res){
        try {
            req.session.token=null;
            res.status(200).json({
                success:true,
                message:"User logout successfully"
            })
        } catch (error) {
            res.status(500).json({
                success:false,
                message:error.message
            })
        }
    }
}


module.exports=userContoller