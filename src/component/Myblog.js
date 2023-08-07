import React from 'react'
import "../css/addblog.css";
import { useContext } from 'react';
import Blogcontext from "../context/Blogcontext";
import {Link} from "react-router-dom";
const Myblog = (props) => {
  const blogdata=useContext(Blogcontext);

  // this is important we can make the onclick funciton async so that the other function runs by await.
  const deleteblog=async()=>{
    await blogdata.deleteblog(props.blogdata._id);
    await blogdata.fetchmyblog();

  }
  const editblog=()=>{
    alert("You can edit now.");
    blogdata.seteditblogcontent({id:props.blogdata._id,title:props.blogdata.title,description:props.blogdata.description,blogtype:props.blogdata.blogtype})
  }
  return (
    <div className='myblogcard'>
      <h4>{props.blogdata.title}</h4>
        <div className="dateandtypesec">
            <h5>{props.blogdata.date}</h5>
            <h5>{props.blogdata.blogtype}</h5>
        </div>
        <p>{props.blogdata.description.slice(0,250)}...</p>
        <div className="icons">
        <Link to="/editpage"><box-icon id="edit" name='edit-alt' style={{cursor:"pointer"}} onClick={editblog}></box-icon></Link>
        <box-icon id="del" name="trash"  style={{cursor:"pointer"}} onClick={deleteblog}></box-icon>
        </div>
    </div>
  )
}

export default Myblog
