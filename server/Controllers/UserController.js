import UserModel from "../Models/userModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Get all users
export const getAllUsers = async (req, res) => {

    try {
      let users = await UserModel.find();
      users = users.map((user)=>{
        const {password, ...otherDetails} = user._doc
        return otherDetails
      })
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json(error);
    }
  };

// get a user
export const getUser= async(req, res)=>{
    const id= req.params.id;
    
    try {
        // try {
            // console.log("1");
            const user = await UserModel.findById(id);
        // } catch (error) {
        //     console.log("2");
        //     console.log(error); 
        // }
        
        if(user){
            // console.log("3");
            const {password, ...otherDetails}= user._doc;
            res.status(200).json(otherDetails);
        }
        else{
            // console.log("4");
            res.status(404).json("No such user exists");
        }
    } catch (error) {
        // console.log("5");
        res.status(500).json(error);
    }
}

// Update a user
export const updateUser = async(req, res)=>{
    const id= req.params.id;
    const {_id, currentUserAdminStatus, password}=req.body;

    if(id=== _id || currentUserAdminStatus){
        try {

            if(password){
                const salt= await bcrypt.genSalt(10);
                req.body.password= await bcrypt.hash(password,salt);
            }

            const user= await UserModel.findByIdAndUpdate(id,req.body, {new: true});
            const token = jwt.sign(
                {username:user.username,id:user._id},
                process.env.JWT_KEY,{expiresIn:"1h"}
            )
            console.log("Update user Successful",user);
            res.status(200).json({user,token});
        } catch (error) {
            res.status(500).json(error);
        }
    }
    else{
        res.status(403).json("Access Denied! You can only update your own profile");
    }
}


// Delete user
export const deleteUser= async(req, res)=>{
    const id= req.params.id;
    const {_id, currentUserAdminStatus}=req.body;
    
    if (_id===id || currentUserAdminStatus) {
        try {
            await UserModel.findByIdAndDelete(id);
            res.status(200).json("User deleted successfully");
        } catch (error) {
            res.status(500).json(error);
        }
    } else {
        res.status(403).json("Access Denied! You can only Delete your own profile");
    }
}


// Follow a User
export const followUser = async(req, res)=>{
    const id= req.params.id;

    const {_id}=req.body;

    if(_id ===id){
        res.status(403).json("Action Forbidden");
    }
    else{
        try {
            const followUser= await UserModel.findById(id);
            const followingUser= await UserModel.findById(_id);
            
            if(!followUser.followers.includes(_id)){
                await followUser.updateOne({$push: {followers: _id}});
                await followingUser.updateOne({$push:{following: id}});
                res.status(200).json("User followed");
            }
            else{
                res.status(403).json("User is already followed by you");
            }
            

        } catch (error) {
            res.status(500).json(error);
        }
    }
}

// UnFollow a User
export const UnFollowUser = async(req, res)=>{
    const id= req.params.id;

    const {_id}=req.body;

    if(_id===id){
        res.status(403).json("Action Forbidden");
    }
    else{
        try {
            const followUser= await UserModel.findById(id);
            const followingUser= await UserModel.findById(_id);
            
            if(followUser.followers.includes(_id)){
                await followUser.updateOne({$pull: {followers: _id}});
                await followingUser.updateOne({$pull:{following: id}});
                res.status(200).json("User Unfollowed");
            }
            else{
                res.status(403).json("User is not followed by you");
            }
            

        } catch (error) {
            res.status(500).json(error);
        }
    }
}