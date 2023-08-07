import React, { useEffect, useState } from "react";
import { useContext } from "react";
import Blogcontext from "../context/Blogcontext";
import { useHistory } from "react-router-dom";

const Editpage = () => {
    const history=useHistory();
    const blogdata = useContext(Blogcontext);
    const [newblog,setnewblog]=useState({newtitle:blogdata.editblogcontent.title,newdescription:"",newblogtype:""});
    useEffect(()=>{
        setnewblog({newtitle:blogdata.editblogcontent.title,newdescription:"",newblogtype:""});
    },[])
  const changevalues = (e) => {
    setnewblog({...newblog,[e.target.name]:e.target.value})
  };
  const upload = (e) => {
    if(newblog.newtitle.length===0||newblog.newdescription.length===0||newblog.newblogtype.length===0){
        e.preventDefault();
        alert("Enter the details correctly");
    }
    else{
        blogdata.updateblog(blogdata.editblogcontent.id,newblog.newtitle,newblog.newdescription,newblog.newblogtype);
      alert("Successfully Edited");
      history.push("/createnewblog");
    }
  };

  return (
    <div className="addingblogseccover">
      <div className="addingblogsec" style={{backgroundColor:"whitesmoke",boxShadow:"2px 2px 8px black"}}>
        <h3>Edit Blog</h3>
        <form action="/post">
          <div className="title">
            <label htmlFor="newtitle">Title</label>
            <input
            onChange={changevalues}
            value={newblog.newtitle}
            type="text"
            name="newtitle"
            id="newtitle"
          />
          </div>
          <div className="blogtype">
            <label htmlFor="newblogtype">Blogtype</label>
            <div className="blogtypeinput" onChange={changevalues}>
              <input type="radio" name="newblogtype" value={"Art"} />
              Art
              <input type="radio" name="newblogtype" value={"Bussiness"} />
              Bussiness
              <input type="radio" name="newblogtype" value={"Fashion"} />
              Fashion
              <input type="radio" name="newblogtype" value={"Food"} />
              Food
              <input type="radio" name="newblogtype" value={"Music"} />
              Music
              <input type="radio" name="newblogtype" value={"Gym"} />
              Gym
              <input type="radio" name="newblogtype" value={"News"} />
              News
              <input type="radio" name="newblogtype" value={"Photography"} />
              Photography
              <input type="radio" name="newblogtype" value={"Sports"} />
              Sports
              <input type="radio" name="newblogtype" value={"Technology"} />
              Technology
              <input type="radio" name="newblogtype" value={"Travel"} />
              Travel
            </div>
          </div>
          <div className="description">
            <label htmlFor="newdescription">Description</label>
            <textarea
              name="newdescription"
              id="newdescription"
              cols="70"
              rows="6"
              onChange={changevalues}
            >
              {blogdata.editblogcontent.description}
            </textarea>
          </div>
          <button onClick={upload}>Upload</button>
        </form>
      </div>
    </div>
  );
};

export default Editpage;
