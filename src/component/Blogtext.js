import React from "react";
import Blogcontext from "../context/Blogcontext";

import "../css/blogpage.css";
import { useContext,useState } from "react";
import Commenttab from "./Commenttab";
import { useHistory } from "react-router-dom";

const Blogtext = (props) => {
  const history=useHistory();
  // backtrackid
  const contextdata=useContext(Blogcontext);
  const [flag,setflag]=useState({one:true});
  const [comment,setcomment]=useState({commentinput:""});
  const backtrackid=contextdata.backtrack.previousid;
  
  const addcommentstate=(e)=>{
    setcomment({...comment,[e.target.name]:e.target.value})
  } 
  const uploadcomment= async()=>{
    if(localStorage.getItem("token")){
      await contextdata.addcomment(props.blog._id,comment.commentinput);
      await contextdata.getcomment(props.blog._id);
    }
    else{
      alert("login first to add the comment");
      history.push("/login");
    }
  }


  const togglecommentsec= async()=>{
    if(flag.one){
      (backtrackid.length===0)?(console.log("length is zero")):(document.getElementById(backtrackid).style.display="none");

      setflag({one:false});
      contextdata.getcomment(props.blog._id);
      contextdata.setbacktrack({previousid:`commentarea${props.blog._id}`});
      document.getElementById(`commentarea${props.blog._id}`).style.display="flex";
      
    }
    else{
      
      document.getElementById(`commentarea${props.blog._id}`).style.display="none";
      setflag({one:true});
    }
  }
  

  return (
    <div className="blogpage">
      <h2>{props.blog.title}</h2>
      <div className="typeandby">
        <h4 id="blogtypename">Blogtype: {props.blog.blogtype}</h4>
        <h4 id="usernameblog">By: {props.blog.name}</h4>
      </div>
      <p>{props.blog.description}</p>
      <div className="time">
        <p>Date of publishing:{props.blog.date}</p>
      </div>
      <div className="commentbox">
        <box-icon name="comment" onClick={togglecommentsec}></box-icon>
      </div>
      <div className="commentsec" id={`commentarea${props.blog._id}`}>
        <div className="inputcomment">
        
        <input type="text" placeholder="type your comment" id="commentinput" name="commentinput" onChange={addcommentstate}/>
        <box-icon id="sendbtn" name='send' onClick={()=>{
          uploadcomment();
          contextdata.getcomment(props.blog._id);
        
        }}></box-icon>
        </div>
        <div className="allcomments">
              {contextdata.allcomment.map((commentdata)=>{
                return <Commenttab key={commentdata._id} comment={commentdata} />
              })}
        </div>
      </div>
    </div>
  );
};

export default Blogtext;
