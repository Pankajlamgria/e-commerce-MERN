import React, { useContext, useEffect } from "react";
import art from "../image/art.jpg";
import business from "../image/business.jpg";
import Fashionandbeautyblogs from "../image/Fashionandbeautyblogs.jpg";
import food from "../image/food.jpg";
import music from "../image/music.jpg";
import healthandfitness from "../image/healthandfitness.jpg";
import news from "../image/news.jpg";
import Photography from "../image/Photography.jpg";
import sports from "../image/sports.jpg";
import technology from "../image/technology.jpg";
import travel from "../image/travel.jpg";
import Blogstate from "../context/Blogcontext";
import Blogtext from "./Blogtext"
import "../css/home.css";
import { useState } from "react";
const Home = () => {
  const [active,setactive]=useState({one:"artimg"});
  const contextdata=useContext(Blogstate);
  useEffect(()=>{
    contextdata.fetchall();
     // eslint-disable-next-line
  },[])
  return (
    <div>
      <div className="covertypeblog">
        <div className="typeblog" >
          <div  className="imgcomponent">
            <img id="artimg" src={art} alt="foodimg" style={{"--i":1}} onClick={()=>{contextdata.fetchallblogtype("Art")
           document.getElementById(active.one).style.boxShadow="1px 1px 8px #000000";
           document.getElementById("artimg").style.boxShadow="#65357d 2px 2px 12px";
           setactive({one:"artimg"});}}/>
            <p style={{"--i":1}}  >ART </p>
          </div>
          <div className="imgcomponent">
            <img id="businessimg" src={business} alt="foodimg" style={{"--i":2}}  onClick={()=>{contextdata.fetchallblogtype("Bussiness")
           document.getElementById(active.one).style.boxShadow="1px 1px 8px #000000";
           document.getElementById("businessimg").style.boxShadow="#65357d 2px 2px 12px";
           setactive({one:"businessimg"});}}/>
            <p style={{"--i":2}}>BUSSINESS</p>
          </div>
          <div className="imgcomponent">  
            <img id="fashionimg" src={Fashionandbeautyblogs} alt="foodimg"  style={{"--i":3}} onClick={()=>{contextdata.fetchallblogtype("Fashion")
           document.getElementById(active.one).style.boxShadow="1px 1px 8px #000000";
           document.getElementById("fashionimg").style.boxShadow="#65357d 2px 2px 12px";
           setactive({one:"fashionimg"});}}/>
            <p style={{"--i":3}}>FASHION</p>
          </div>
          <div className="imgcomponent">
            <img id="foodimg" src={food} alt="foodimg"  style={{"--i":4}} onClick={()=>{contextdata.fetchallblogtype("Food")
            
            document.getElementById(active.one).style.boxShadow="1px 1px 8px #000000";
            document.getElementById("foodimg").style.boxShadow="#65357d 2px 2px 12px";
            setactive({one:"foodimg"});
          }}/>
            <p style={{"--i":4}}>FOOD</p>
          </div>
          <div className="imgcomponent">
            <img id="musicimg" src={music} alt="foodimg" style={{"--i":5}}  onClick={()=>{contextdata.fetchallblogtype("Music")
           document.getElementById(active.one).style.boxShadow="1px 1px 8px #000000";
           document.getElementById("musicimg").style.boxShadow="#65357d 2px 2px 12px";
           setactive({one:"musicimg"});}}/>
            <p style={{"--i":5}}>MUSIC</p>
          </div>
          <div className="imgcomponent">
            <img id="gymimg" src={healthandfitness} alt="foodimg" style={{"--i":6}} onClick={()=>{contextdata.fetchallblogtype("Gym")
           document.getElementById(active.one).style.boxShadow="1px 1px 8px #000000";
           document.getElementById("gymimg").style.boxShadow="#65357d 2px 2px 12px";
           setactive({one:"gymimg"});}}/>
            <p style={{"--i":6}}>GYM</p>
          </div>
          <div className="imgcomponent">
            <img id="newsimg" src={news} alt="foodimg" style={{"--i":7}} onClick={()=>{contextdata.fetchallblogtype("News")
             document.getElementById(active.one).style.boxShadow="1px 1px 8px #000000";
            document.getElementById("newsimg").style.boxShadow="#65357d 2px 2px 12px";
            setactive({one:"newsimg"});
          }}/>
            <p style={{"--i":7}}>NEWS</p>
          </div>
          <div className="imgcomponent">
            <img id="photographyimg" src={Photography} alt="foodimg" style={{"--i":8}} onClick={()=>{contextdata.fetchallblogtype("Photography")
           document.getElementById(active.one).style.boxShadow="1px 1px 8px #000000";
           document.getElementById("photographyimg").style.boxShadow="#65357d 2px 2px 12px";
           setactive({one:"photographyimg"});}}/>
            <p style={{"--i":8}}>PHOTOGRAPHY</p>
          </div>
          <div className="imgcomponent">
            <img id="sportsimg" src={sports} alt="foodimg" style={{"--i":9}} onClick={()=>{contextdata.fetchallblogtype("Sports")
           document.getElementById(active.one).style.boxShadow="1px 1px 8px #000000";
           document.getElementById("sportsimg").style.boxShadow="#65357d 2px 2px 12px";
           setactive({one:"sportsimg"});}}/>
            <p style={{"--i":9}}>SPORTS</p>
          </div>
          <div className="imgcomponent">
            <img id="technologyimg" src={technology} alt="foodimg" style={{"--i":10}} onClick={()=>{contextdata.fetchallblogtype("Technology")
           document.getElementById(active.one).style.boxShadow="1px 1px 8px #000000";
           document.getElementById("technologyimg").style.boxShadow="#65357d 2px 2px 12px";
           setactive({one:"technologyimg"});}}/>
            <p style={{"--i":10}}>TECHNOLOGY</p>
          </div>
          <div className="imgcomponent">
            <img id="travelimg" src={travel} alt="foodimg" style={{"--i":11}} onClick={()=>{contextdata.fetchallblogtype("Travel")
           document.getElementById(active.one).style.boxShadow="1px 1px 8px #000000";
           document.getElementById("travelimg").style.boxShadow="#65357d 2px 2px 12px";
           setactive({one:"travelimg"});}}/>
            <p style={{"--i":11}}>TRAVEL</p>
          </div>
        </div>
      </div>
      <div className="blogtext">
        {contextdata.blogdata.map((arraydata)=>{
          return <Blogtext key={arraydata._id} blog={arraydata} />;
        })}
      </div>
      
    </div>
  );
};

export default Home;
