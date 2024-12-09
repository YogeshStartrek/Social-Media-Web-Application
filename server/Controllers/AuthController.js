import UserModel from "../Models/userModel.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
export const registerUser = async(req, res)=>{
    console.log("Register user")
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    req.body.password=hashedPass;
    const newUser= new UserModel(req.body);
    const {username}=req.body;
    try {
        const oldUser= await UserModel.findOne({username});
        if (oldUser) {
            return res.status(400).json({message:"Username already exists"})
        }

        const user=await newUser.save();
        console.log(user)
        const token = jwt.sign({
            username:user.username, id: user._id
        },process.env.JWT_KEY,{expiresIn:'1h'})
        res.status(200).json({user, token});
    } catch (error) {
        res.status(500).json({message: error.message});        
    }
}


// Login Handler

export const loginUser = async(req, res)=>{
    console.log("Logging in initiated");
    const {username, password}= req.body;
    console.log(username," ",password);
    try {
        const user = await UserModel.findOne({username: username});
        console.log(user);
        if(user){
            const checkPass = await bcrypt.compare(password,user.password);

            if (!checkPass) {
                res.status(400).json({msg:"wrong password"});
              } else {
                const token = jwt.sign(
                  { username: user.username, id: user._id },
                  process.env.JWT_KEY,
                  { expiresIn: "1h" }
                );
                res.status(200).json({ user, token });
              }
            console.log("logging successful");
        }
        else{
            console.log("User does not exist")
            res.status(404).json({message:"User does not exists"});
        }
    } catch (error) {
        res.status(500).json({message: error.message});  
    }
}