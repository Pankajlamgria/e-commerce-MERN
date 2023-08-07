import React, { useState } from 'react'
import "../css/login.css"
import { useHistory } from 'react-router-dom';

const Login = () => {
  const history=useHistory();
  const host="https://switchbackend.onrender.com";
  const [logindata,setlogindata]=useState({email:"",password:""});
  const detailschange=(e)=>{
    setlogindata({...logindata,[e.target.name]:e.target.value})
  } 
  const clearall=(e)=>{
    e.preventDefault();
    setlogindata({email:"",password:""});
    document.getElementById("loginform").reset();
  }
  
  const submit =async (e)=>{
    e.preventDefault();
    const response = await fetch(`${host}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email:logindata.email,password:logindata.password}),
    });
    const json = await response.json();
    
    if(json.success){
      localStorage.setItem("token",json.authenticationtoken);
     
      history.push("/");
    }
    else{
      alert(json.error);
    }
  }; 
  return (
    <div className='logincover'>
      <div className="loginpage">
        <h2>Login to Switch </h2>
        <form action="" id="loginform">
          <div className="emailsec">
           <label htmlFor="email">Email</label>
           <input type="text" name="email" id="email"  onChange={detailschange}/>
           </div>
          <div className="passwordsec">
           <label htmlFor="password">Password</label>
           <input type="password" name="password" id="password"  onChange={detailschange}/>
           </div>
           <div className="buttons">
            <button onClick={submit}>Login</button>
            <button onClick={clearall}>Cancel</button>
           </div>
        </form>

      </div>
    </div>
  )
}

export default Login
