import React from 'react'
import "../css/signin.css"
import { useState } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

const Signin = () => {
  const history=useHistory();
  const [signindata,setesignindata]=useState({username:"",email:"",password:"",profession:""});
  const changesignindata=(e)=>{
    setesignindata({...signindata,[e.target.name]:e.target.value});
  }
  const clearall=(e)=>{
    e.preventDefault();
    document.getElementById("signinform").reset();
  }
  const submit=async(e)=>{
    e.preventDefault();
    const response = await fetch(`https://switchbackend.onrender.com/api/auth/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({name:signindata.username,email:signindata.email,password:signindata.password,profession:signindata.profession}),
    });
    let val=await response.json();
    if(val.success){
      localStorage.setItem("token",val.authenticationtoken);
      history.push("/");
    }
    
  }
  return (
    <div className='signincover'>
      <div className="siginpage">
        <h2>Create new account </h2>
        <form action="" id="signinform">
          <div className="signinusernamesec">
           <label htmlFor="username">Username</label>
           <input type="text" name="username" id="username" onChange={changesignindata}/>
           </div>
          <div className="signinprofessionsec">
           <label htmlFor="profession">Profession</label>
           <input type="text" name="profession" id="profession" onChange={changesignindata}/>
           </div>
          <div className="signinemailsec">
           <label htmlFor="email">Email</label>
           <input type="text" name="email" id="email" onChange={changesignindata}/>
           </div>
          <div className="signinpasswordsec">
           <label htmlFor="password">Password</label>
           <input type="password" name="password" id="password" onChange={changesignindata}/>
           </div>
           <div className="signinbuttons">
            <button onClick={submit}>Signin</button>
            <button onClick={clearall}>Cancel</button>
           </div>
        </form>

      </div>
    </div>
  )
}

export default Signin
