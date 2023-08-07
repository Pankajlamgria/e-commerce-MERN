import React from "react";
import "../css/addblog.css";
import { useState } from "react";
import Blogcontext from "../context/Blogcontext";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import Myblog from "./Myblog";

const Addnewblog = () => {
  const history=useHistory();
  const blogdata=useContext(Blogcontext);
  const [valuestate,setvaluestate]=useState({newtitle:"",newdescription:"",newblogtype:""});
  useEffect(()=>{
    blogdata.fetchmyblog();
     // eslint-disable-next-line
  },[])
  const changevalues=(e)=>{
    setvaluestate({...valuestate,[e.target.name]:e.target.value})
  }
  const upload=(e)=>{
    if(localStorage.getItem("token")){
      e.preventDefault();
      if(valuestate.newtitle.length===0||valuestate.newdescription.length===0||valuestate.newblogtype.length===0){
          alert("Enter the details correctly");
      }
      else{
        blogdata.addblog(valuestate.newtitle,valuestate.newdescription,valuestate.newblogtype);
        alert("Successfully uploaded");

      }
    }
    else{
      alert("Create a new Accout or login to the existing one");
      history.push("/signin");
    }
  }
  return (
    <div>
    <div className="addingblogseccover">
      <div className="addingblogsec">
        <h3>Add new Blog</h3>
        <form action="">
          <div className="title">
            <label htmlFor="newtitle">Title</label>
            <input type="text" id="newtitle" name="newtitle" onChange={changevalues}/>
          </div>
          <div className="blogtype">
            <label htmlFor="newblogtype">Blogtype</label>
            <div className="blogtypeinput" onChange={changevalues}>
              <input type="radio" name="newblogtype" value={"Art"} />Art
              <input type="radio" name="newblogtype" value={"Bussiness"} />Bussiness
              <input type="radio" name="newblogtype" value={"Fashion"} />Fashion
              <input type="radio" name="newblogtype" value={"Food"} />Food
              <input type="radio" name="newblogtype" value={"Music"} />Music
              <input type="radio" name="newblogtype" value={"Gym"} />Gym
              <input type="radio" name="newblogtype" value={"News"} />News
              <input type="radio" name="newblogtype" value={"Photography"} />Photography
              <input type="radio" name="newblogtype" value={"Sports"} />Sports
              <input type="radio" name="newblogtype" value={"Technology"} />Technology
              <input type="radio" name="newblogtype" value={"Travel"} />Travel
            </div>
          </div>
          <div className="description">
            <label htmlFor="newdescription">Description</label>
            <textarea  name="newdescription" id="newdescription" cols="70" rows="6" onChange={changevalues}></textarea>
          </div>
          <button onClick={upload}>Upload</button>
        </form>
      </div>
    </div>
    <h3 id="myblogheading">My blog</h3>
    <div className="myblogscover">
      
      {blogdata.blogdata.map((individualblog)=>{
        return <Myblog key={individualblog._id} blogdata={individualblog}/>
      })}
    </div>
    </div>
  );
};

export default Addnewblog;
