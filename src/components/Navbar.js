import React, { useEffect, useState } from "react";
import loginimg from "../image/loginimg.jpg";
import { Link } from "react-router-dom";
import "../css/navbar.css";
import webcontext from "../context/Ewebcontext";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useContext } from "react";
import avatar from "../image/avatar.png";
const Navbar = () => {
  const contextcontent=useContext(webcontext);
  const [flag, setflag] = useState({ one: false });
  const [toogleuser, setuser] = useState({ one: false });
  const [newuserstate, setnewuser] = useState({ one: false });
  const [logindata,setlogindata]=useState({email:"",password:""});
  const [signindata,setsignindata]=useState({username:"",number:0 ,address:"",semail:"",spassword:""})
  const history=useHistory();
  const handleclosegreenalert=()=>{
    contextcontent.setgreenalrt(false);
  }
  const handlecloseredalert=()=>{
    contextcontent.setredalrt(false);
  }


  window.onscroll = function () {
    scrollFunction();
  };
  const handlesigninchange=(e)=>{
    setsignindata({...signindata,[e.target.name]:e.target.value});
  }
  const setdetails=(e)=>{
    setlogindata({...logindata,[e.target.name]:e.target.value});
  }
  
  const handlelogin=async(e)=>{
    e.preventDefault();
    const response = await fetch(`${contextcontent.host}/api/auth/login`, {
      method: "POST",  
      headers: {
        "Content-Type": "application/json",
        
      },
      body: JSON.stringify({email:logindata.email,password:logindata.password}),
    });
    const loginreturn=await response.json();
    if(loginreturn.success){
      localStorage.setItem("webtoken",loginreturn.authtoken);
      localStorage.setItem("webemail",loginreturn.email);
      document.getElementById("logsec").style.display  = "none";
      setuser({ one: false });
      // window.location.reload(false);
      contextcontent.setalrttext("Login successfull");
      contextcontent.setgreenalrt(true);
    }
    else{
      contextcontent.setalrttext(`${loginreturn.error}`);
      contextcontent.setredalrt(true);
      
    }
  }
  const handlesignin=async(e)=>{
    e.preventDefault();
    const response = await fetch(`${contextcontent.host}/api/auth/createuser`, {
      method: "POST",  
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email:signindata.semail,password:signindata.spassword,name:signindata.username,number:signindata.number,address:signindata.address}),
    });
    const signinreturn=await response.json();
    if(signinreturn.success){
      localStorage.setItem("webtoken",signinreturn.authtoken);
      localStorage.setItem("webemail",signinreturn.email);
      document.getElementById("logsec").style.display  = "none";
      setuser({ one: false });
      window.location.reload(false);
    }
    else{
      contextcontent.setredalrt(true);
      contextcontent.setalrttext(`${signinreturn.error}`);
    }
  }
  function scrollFunction() {
    let windowsize=window.innerWidth;
    if (
      document.body.scrollTop > 10 ||
      document.documentElement.scrollTop > 10
    ) {
      document.getElementById("navbarid").style.top = "0px";
    } else {
      if(windowsize<=470){
        document.getElementById("navbarid").style.top = "46px";

      }
      else{
        document.getElementById("navbarid").style.top = "29px";

      }
    }
  }
  const showloginpage = async() => {
    if (!localStorage.getItem("webtoken")) {
      if (toogleuser.one === false) {
        document.getElementById("logsec").style.display = "flex";
        setuser({ one: true });
      } else {
        document.getElementById("logsec").style.display = "none";
        setuser({ one: false });
      }
    } else {
      if (toogleuser.one === false) {
        await contextcontent.showuserdetails();

        document.getElementById("userdetails").style.height = "14rem";
        setuser({ one: true });
      } else {
        document.getElementById("userdetails").style.height = "0rem";
        setuser({ one: false });
      }
    }
  };
  const handlelogout=(e)=>{
    localStorage.removeItem("webtoken");
    localStorage.removeItem("webemail");
    document.getElementById("userdetails").style.height = "0rem";
    setuser({ one: false });
    window.location.reload(false);
  }
  const handleaddproduct=()=>{
    document.getElementById("userdetails").style.height = "0rem";
    setuser({ one: false });
    history.push("/addproduct");

  }

  function newuser() {
    if (newuserstate.one === false) {
      document.getElementById("loginform").style.display = "none";
      document.getElementById("signinform").style.display = "flex";
      setnewuser({ one: true });
    } else {
      document.getElementById("loginform").style.display = "flex";
      document.getElementById("signinform").style.display = "none";
      setnewuser({ one: false });
    }
  }
  const showmenu = () => {
    if (flag.one === false) {
      document.getElementById("selector").style.height = "150px";
      setflag({ one: true });
    } else {
      document.getElementById("selector").style.height = "0px";
      setflag({ one: false });
    }
  };
  const search=()=>{
    history.push("/search");
  }
  const handleshowcart=()=>{
    history.push("/cart");
  }
  return (
    <div>
      <div className="toheading">
        <h5>
          SHOP 50% OFF SALE COLLECTION - INCLUDING 50% OFF ALREADY REDUCED
          PRICES
        </h5>
      </div>
      <div className="navbar" id="navbarid">
        <div className="companynamesec">
          <div className="slideshow">
            <span id="navbarshowicon" onClick={showmenu}>
              &#9776;
            </span>
            <h2>
              <Link to="/">SPORTS CRAFT</Link>
            </h2>
          </div>
          <div className="navicons">
            <box-icon name="user-circle" onClick={showloginpage}></box-icon>
            <box-icon name="cart" onClick={handleshowcart}></box-icon>
            <box-icon name="search-alt-2" onClick={search}></box-icon>
          </div>
        </div>
        <div className="selectors" id="selector">
          <Link className="selectorlink selectorfromLeft" to="/allproducts">
            All Product
          </Link>
          <Link className="selectorlink selectorfromLeft" to="/products" onClick={()=>{
            contextcontent.sethomefilter("MEN");
          }}>
            Men
          </Link>
          <Link className="selectorlink selectorfromLeft" to="/products" onClick={()=>{
            contextcontent.sethomefilter("WOMEN");
          }}>
            Women
          </Link>
          <Link className="selectorlink selectorfromLeft" to="/products" onClick={()=>{
            contextcontent.sethomefilter("KID");
          }}>
            Kid
          </Link>
          <Link className="selectorlink selectorfromLeft" to="/products" onClick={()=>{
            contextcontent.sethomefilter("SPORTS");
          }}>
            Sports
          </Link>
          <Link className="selectorlink selectorfromLeft" to="/products" onClick={()=>{
            contextcontent.sethomefilter("TECHNOLOGY");
          }}>
            Technology
          </Link>
        </div>
      </div>
      <div id="logsec">
        <div className="loginimage">
          <img src={loginimg} alt="img" />
        </div>
        <div className="line"></div>
        <form action="" id="loginform">
          <div className="emailsec">
            <label htmlFor="email">Email</label>
            <input type="text" id="email" name="email" onChange={setdetails} />
          </div>
          <div className="passwordsec">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" onChange={setdetails}/>
          </div>
          <button id="loginbtn" onClick={handlelogin}>login</button>
          <p onClick={newuser}>Create new account</p>
        </form>
        <form action="" id="signinform">
          <div className="namesec">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" onChange={handlesigninchange} />
          </div>
          <div className="numbersec">
            <label htmlFor="number">Number</label>
            <input type="number" id="number" name="number" onChange={handlesigninchange}/>
          </div>
          
          <div className="addresssec">
            <label htmlFor="address">Address</label>
            <input type="text" id="address" name="address" onChange={handlesigninchange}/>
          </div>
          <div className="semailsec">
            <label htmlFor="semail">Email</label>
            <input type="text" id="semail" name="semail" onChange={handlesigninchange}/>
          </div>
          <div className="spasswordsec">
            <label htmlFor="spassword">Password</label>
            <input type="password" id="spassword" name="spassword" onChange={handlesigninchange}/>
          </div>
          <p onClick={newuser}>go to login</p>
          <button id="continue" onClick={handlesignin}>Continue</button>
        </form>
      </div>
      <div id="userdetails">
        <div className="firstdetails">
          <img src={avatar} alt="user" />
          <div className="useremail">
          <span>{contextcontent.userdetailstate.username}</span>
          <span>{contextcontent.userdetailstate.email}</span>
          </div>
      </div>
      <div className="horizontalline">

      </div>
      <div className="seconddetails">
        <p onClick={handlelogout}>logout</p>
        <p onClick={handleaddproduct} style={{display:(localStorage.getItem("webemail")==="pankajlamgria@gmail.com")?("block"):("none")}}>Add products</p>
      </div>
      </div>
      <div className="alerts" id="greenalertid" style={{width:(contextcontent.greenalrt)?(window.innerWidth<=400)?"90%":"52%":"0%"}}>
        <span id="textalert">{contextcontent.alrttext}</span>
        <p id="closealert" onClick={handleclosegreenalert}>X</p>
      </div>
      <div className="alerts" id="redalertid"  style={{width:(contextcontent.redalrt)?(window.innerWidth<=400)?"90%":"52%":"0%"}}>
        <span id="textalert">{contextcontent.alrttext}</span>
        <p id="closealert" onClick={handlecloseredalert}>X</p>
      </div>
    </div>
  );
};

export default Navbar;
