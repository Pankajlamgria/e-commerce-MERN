import React from "react";
import "../css/Navbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import Blogcontext from "../context/Blogcontext";
import { useHistory } from "react-router-dom";
import avatar from "../image/avatar.png";
import mainavatar from "../image/mainavatar.png";
const Navbar = () => {
  const history = useHistory();
  const blogdata = useContext(Blogcontext);
  const addsecreveal = () => {
    if (localStorage.getItem("token")) {
      history.push("/createnewblog");
    } else {
      alert("Crete new account or login first");
      history.push("/signin");
    }
  };
  const logout=()=>{
    localStorage.removeItem("token");
    document.getElementById("mySidenav").style.width = "0px";
    blogdata.fetchall();
    // document.getElementById("usericon").style.display = "none";
    // document.getElementById("loginbtns").style.display = "flex";
    

  }
  function openNav() {
    blogdata.userdetails();
    document.getElementById("mySidenav").style.width = "450px";
  }
  
  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }

  return (
    <div>
      <div id="mySidenav" className="sidenav">
        {/* <a href="javascript:void(0)" className="closebtn" onClick={closeNav}>
          &times;
        </a> */}
        <div className="closebtn" > 
 
        <box-icon name='x' onClick={closeNav}></box-icon>
        </div>
        <div className="slideiconcover">
          <img id="sliduser" src={avatar} alt="" />
         {/* <box-icon name="user-circle" id="sliduser" onClick={openNav}></box-icon> */}
        <h4>Username: {blogdata.userdetialstate.name}</h4>
        <h4>Profession: {blogdata.userdetialstate.profession}</h4>
        <h4>Email: {blogdata.userdetialstate.email}</h4>
        <h4><button id="logoutbtn" onClick={logout}>logout</button></h4>
         </div>
      </div>
      <div className="Navbar">
        <h2 id="webname">Switch</h2>
        <div className="innnernavcontent">
          <ul type="none">
            <li>
              <Link to="/" onClick={blogdata.fetchall}>
                Home
              </Link>
            </li>
            <li onClick={addsecreveal}>YourWork</li>
          </ul>
          <div
            style={localStorage.getItem("token") ? { display: "none" } : {}}
            className="userbtn" id="loginbtns"
          >
            <Link to="/login">
              <button>Login</button>
            </Link>
            <Link to="/signin">
              <button>Signin</button>
            </Link>
          </div>
          <div className="logoutbtncover" style={!localStorage.getItem("token") ? { display: "none" } : {}}>
            {/* <box-icon name="user-circle" id="usericon" onClick={openNav}></box-icon> */}
            <img src={mainavatar} alt="user" id="usericon"  onClick={openNav} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
