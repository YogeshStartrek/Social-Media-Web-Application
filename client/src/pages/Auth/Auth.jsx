import React, { useState } from 'react'
import './Auth.css'
import Logo from '../../img/logo.png'
import { useDispatch, useSelector } from 'react-redux'
import { logIn, signUp } from '../../actions/AuthAction'

const Auth = () => {

  const [isSignUp, setIsSignUp] = useState(false);
  const [confirmPass, setConfirmPass] = useState(true);
  const dispatch= useDispatch();
  const loading=useSelector((state)=>state.authReducer.loading);
  const [data, setData] = useState({ firstname: "", lastname: "", password: "", confirmpass: "", username: "" })

  const handleChange = (e) => {
    // console.log(data)
    setData({ ...data, [e.target.name]: e.target.value })
    // console.log(data)
  }


  const handleSubmit=(e)=>{
    e.preventDefault();

    if(isSignUp){
      console.log("starting signup")
      data.password===data.confirmpass?dispatch(signUp(data)):setConfirmPass(false);
    }
    else{
      console.log("starting login")
      dispatch(logIn(data));
    }
  }

  const resetForm=()=>{
    setConfirmPass(true);
    setData({ 
      firstname: "",
      lastname: "",
      password: "",
      confirmpass: "",
      username: "" });
  }

  return (
    <div className="Auth">
      <div className="a-left">
        <img src={Logo} alt="" />
        <div className="Webname">
          <h1>Quick Friends</h1>
          <h6>Explore the world with friends from the world!!!</h6>
        </div>
      </div>


      {/* Right Side of the form */}

      {/* <Signup /> */}
      {/* <Login/> */}


      <div className="a-right">
        <form className='infoForm authForm' onSubmit={handleSubmit}>

          <h3>{isSignUp ? "Sign Up" : "Log in"}</h3>

          {/* Name */}
          {isSignUp &&
            <div>
              <input type="text" placeholder='First Name'
                className='infoInput' name='firstname' 
                onChange={handleChange} 
                value={data.firstname}
                />
              <input type="text" placeholder='Last Name'
                className='infoInput' name='lastname' 
                onChange={handleChange} 
                value={data.lastname}
                />
            </div>
          }

          {/* Signup/login username/mail */}
          <div>
            <input type="text" className="infoInput" name='username'
              placeholder='Username' onChange={handleChange} 
              value={data.username}
              />
          </div>

          {/* Password */}
          <div>
            <input type="password" className="infoInput" 
            name='password' placeholder='Password' 
            onChange={handleChange}
            value={data.password}
            />

            {isSignUp && <input type="password" className="infoInput" 
            name='confirmpass' placeholder='Confirm Password' 
            onChange={handleChange}
            value={data.confirmpass}
            />}

          </div>

          <span style={{display:confirmPass?"none":"block",color:'red',fontSize:'12px',alignSelf:'flex-end',marginRight:'5px'}}>
            * Confirm Password is not same
          </span>

          {/* Buttons */}
          <div>
            <span style={{ fontSize: '12px', cursor: "pointer" }} onClick={() => { setIsSignUp((prev) => !prev); resetForm(); }}> {isSignUp ? "Already have an account? Login" : "Don't have an account? SignUp"}</span>
          </div>
          <button className="button infoButton" type='submit' disabled={loading}>
            {loading?"Loading...":isSignUp ? "Sign Up" : "Log in"}</button>

        </form>
      </div>

    </div>
  )
}

// SignUp Form
// function Signup() {
//   return (
//     <div className="a-right">
//       <form className='infoForm authForm'>

//         <h3>Sign Up</h3>

//         {/* Name */}
//         <div>
//           <input type="text" placeholder='First Name'
//             className='infoInput' name='firstname' />
//           <input type="text" placeholder='Last Name'
//             className='infoInput' name='lastname' />
//         </div>

//         {/* Signup/login username/mail */}
//         <div>
//           <input type="text" className="infoInput" name='username'
//             placeholder='Username' />
//         </div>

//         {/* Password */}
//         <div>
//           <input type="password" className="infoInput" name='password' placeholder='Password' />
//           <input type="password" className="infoInput" name='confirmpass' placeholder='Confirm Password' />
//         </div>

//         {/* Buttons */}
//         <div>
//           <span style={{fontSize:'12px'}}>Already have an account? Login</span>
//         </div>
//         <button className="button infoButton" type='submit'>Sign Up</button>

//       </form>
//     </div>
//   )
// }


// Login Form
// function Login() {
//   return (
//     <div className="a-right">
//       <form className='infoForm authForm'>

//         <h3>Login</h3>

//         {/* Signup/login username/mail */}
//         <div>
//           <input type="text" className="infoInput" name='username'
//             placeholder='Username' />
//         </div>

//         {/* Password */}
//         <div>
//           <input type="password" className="infoInput" name='password' placeholder='Password' />
//         </div>

//         {/* Buttons */}
//         <div>
//           <span style={{fontSize:'12px'}}>Don't have an account? SignUp</span>
//         </div>
//         <button className="button infoButton" type='submit'>Login</button>

//       </form>
//     </div>
//   )
// }

export default Auth