import React, { useState } from 'react'
import Blogcontext from './Blogcontext'
const Blogstate = (props) => {
    const host="https://switchbackend.onrender.com";
    let s1=[]
    const [userdetialstate,setuserdetialstate]=useState(s1);
    // const [togglelogin,settogglelogin]=useState();
    const [blogdata,setblogdata]=useState(s1);
    const [allcomment,setallcomment]=useState(s1);
    const [backtrack,setbacktrack]=useState({previousid:""});
    const [editblogcontent,seteditblogcontent]=useState({id:"",title:"",description:"",blogtype:""});
    const fetchall=async()=>{
      const response = await fetch(`${host}/api/blog/allblog`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",

          // "auth_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyZGV0YWlscyI6eyJpZCI6IjY0YjBkZDI3ZmRjZmRiMThiNmQ2ZmRkNyJ9LCJpYXQiOjE2ODkzMTI1NTl9.lipW8rfbkWC6B_fK-3yuAJPf1F4hp8OUayKVpcBwTZc",
        },
        // body: JSON.stringify({email:logindata.email,password:logindata.password}),
      });
      const json = await response.json();
      setblogdata(json.allblogs);
      // console.log(blogdata);
    }
    const fetchallblogtype=async(type)=>{
      console.log(type);
      const response = await fetch(`${host}/api/blog/typeblog/${type}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth_token":localStorage.getItem("token"),
          // "auth_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyZGV0YWlscyI6eyJpZCI6IjY0YjBkZDI3ZmRjZmRiMThiNmQ2ZmRkNyJ9LCJpYXQiOjE2ODkzMTI1NTl9.lipW8rfbkWC6B_fK-3yuAJPf1F4hp8OUayKVpcBwTZc",
        },
        // body: JSON.stringify({email:logindata.email,password:logindata.password}),
      });
      const json = await response.json();
      console.log(json);
      setblogdata(json.allblogs);
    }
    const getcomment=async(id)=>{
      const response = await fetch(`${host}/api/blog/getcomment/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyZGV0YWlscyI6eyJpZCI6IjY0YjBkZDI3ZmRjZmRiMThiNmQ2ZmRkNyJ9LCJpYXQiOjE2ODkzMTI1NTl9.lipW8rfbkWC6B_fK-3yuAJPf1F4hp8OUayKVpcBwTZc",
        },
      });
      const json = await response.json();
      setallcomment(json.arraycomment);
    }
    const addcomment=async(id,comment)=>{
      if(localStorage.getItem("token")){

      
      const response = await fetch(`${host}/api/blog/addcomment/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth_token":localStorage.getItem("token"),
        },
        body: JSON.stringify({comment:comment}),
      });
      const json = await response.json();
    }
    else{
      // alert("Create an account first");
      console.log("error");
    }
    }
    const addblog=async(title,description,blogtype)=>{
      const response = await fetch(`${host}/api/blog/addblog`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth_token":localStorage.getItem("token"),
        },
        body: JSON.stringify({title:title,description:description,blogtype:blogtype}),
      });
      const json = await response.json();
      fetchmyblog();
      return json.success;
    }
    const fetchmyblog=async()=>{
      const response = await fetch(`${host}/api/blog/myblog`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth_token":localStorage.getItem("token"),
        },
      });
      const json = await response.json();
      setblogdata(json.allblogs);
      // console.log(blogdata);
    }
    const updateblog=async(id,title,description,blogtype)=>{
      const response = await fetch(`${host}/api/blog/update/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({title:title,description:description,blogtype:blogtype}),
      });
      const json = await response.json();
      // fetchall();
      return json;
    }
    const deleteblog=async(id)=>{
      const response = await fetch(`${host}/api/blog/deleteblog/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth_token":localStorage.getItem("token"),
        },
        // body: JSON.stringify({title:title,description:description,blogtype:blogtype}),
      });
      const json = await response.json();
      return json;
    }
    const userdetails=async(id)=>{
      const response = await fetch(`${host}/api/auth/userdetails`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth_token":localStorage.getItem("token"),
        },
      });
      const json = await response.json();
      setuserdetialstate(json.user);

      // return json;
    }
    
  return (
    <Blogcontext.Provider 
    value={{fetchall,blogdata,addcomment,getcomment,allcomment,backtrack,setbacktrack,addblog,updateblog,fetchmyblog,deleteblog,fetchallblogtype,editblogcontent,seteditblogcontent,userdetails,userdetialstate}}>
        {props.children}  
        </Blogcontext.Provider>
  )
}

export default Blogstate;
