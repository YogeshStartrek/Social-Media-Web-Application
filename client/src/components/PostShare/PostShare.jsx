import React,{useState, useRef} from 'react'
import './PostShare.css'
import ProfileImage from '../../img/profileImg.jpg'
import {UilScenery} from "@iconscout/react-unicons";
import {UilPlayCircle} from "@iconscout/react-unicons";
import {UilLocationPoint} from "@iconscout/react-unicons";
import {UilSchedule} from "@iconscout/react-unicons";
import {UilTimes} from "@iconscout/react-unicons";
import { useDispatch, useSelector } from 'react-redux';
import { uploadImage,uploadPost } from '../../actions/uploadAction';

const PostShare = () => {
    const loading=useSelector((state)=>state.postReducer.uploading);
    const [image,setImage]=useState(null);
    const imageRef=useRef();
    const { user } = useSelector((state) => state.authReducer.authData);
    const desc = useRef();
    const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
    const dispatch=useDispatch();
    const onImageChange=(event)=>{
        if(event.target.files && event.target.files[0]){
            let img=event.target.files[0];
            setImage(img);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        //post data
        const newPost = {
          userId: user._id,
          desc: desc.current.value,
        };
    
        // if there is an image with post
        if (image) {
          const data = new FormData();
          const fileName = Date.now() + image.name;
          data.append("name", fileName);
          data.append("file", image);
          newPost.image = fileName;
          console.log(newPost);
          try {
            dispatch(uploadImage(data));
          } catch (err) {
            console.log(err);
          }
        }
        dispatch(uploadPost(newPost));
        resetShare();
      };
      const resetShare = () => {
        setImage(null);
        desc.current.value = "";
      };



  return (
    <div className="PostShare">
        <img
            src={
            user.profilePicture
                ? serverPublic + user.profilePicture
                : serverPublic + "defaultProfile.jpg"
            }
            alt="Profile"
        />
        <div>
            <input type="text" required
                ref={desc} placeholder="What's happening" />
            <div className="postOptions">
                <div className="option" style={{color:"blue"}}
                onClick={()=>imageRef.current.click()}> 
                    <UilScenery/>
                    Photo
                </div>
                <div className="option" style={{color:"red"}}>
                    <UilPlayCircle/>
                    Video
                </div>
                <div className="option" style={{color:"green"}}>
                    <UilLocationPoint/>
                    Location
                </div>
                <div className="option" style={{color:"pink"}}>
                    <UilSchedule/>
                    Schedule
                </div>
                <button
                    className="button ps-button"
                    onClick={handleSubmit}
                >
                    {loading?"Uploading...":"Share"}
                </button>
                <div style={{display:"none"}}>
                    <input type="file" name="myImage" ref={imageRef } onChange={onImageChange}/>
                </div>
            </div>
            {image && (
                <div className="previewImage">
                    <UilTimes onClick={()=>setImage(null)}/>
                    <img src={URL.createObjectURL(image)} alt="preview" />
                </div>
            )}
        </div>
    </div>
  )
}

export default PostShare