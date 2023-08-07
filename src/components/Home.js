import React from "react";
import banner from "../image/main.jpg";
import banner2 from "../image/homeside.jpg";
import bottomimg1 from "../image/bottom1.jpg";
import bottomimg2 from "../image/bottom2.jpg";
import bottomimg3 from "../image/bottom3.jpg";
import "../css/home.css";
import { TypeAnimation } from "react-type-animation";
import { motion, useAnimation } from "framer-motion";

import { useInView } from "react-intersection-observer";

import { useEffect } from "react";
import { useContext } from "react";
import webcontext  from "../context/Ewebcontext";
import Homeproduct from "./Homeproduct";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
const Home = () => {
  const history=useHistory();
  const control = useAnimation();
  const contextcontent=useContext(webcontext);
  const [ref, inView] = useInView();
  useEffect(()=>{
    contextcontent.shirtdata("TSHIRT");
  },[])
  useEffect(() => {
    if (inView) {
      control.start("visible");
    } 
  }, [control, inView]);
    const boxVariant = {
    visible: { opacity: 1, scale:1.2 },
    hidden: { opacity: 0, scale:0, transition: { duration: 0.6 } },
  };
  const handleshopnow=()=>{ 
    history.push("/allproducts");
  }

 
  
  return (  
    <div className="settopmarginall">
      
      <div className="banner">
        <img src={banner} alt="banner" />
        <h2 className="shopnowtext fromLeft" onClick={handleshopnow}>Shop Now</h2>
      </div>

      <div className="famouscomponents">
        <div className="infocover">
        <h4 className="inforinfamouscomponent">Some of Our favourite picks.</h4>
        </div>
        {/* by using the use effect first load the data into the state and then use the map function to send it to the new other components and put is here */}
        {contextcontent.homeshirt.map((element)=>{
          return <Homeproduct key={element._id} product={element} 
          ></Homeproduct>
        })}
      </div>
      <div className="banner2">
        <div className="imgsec ">
          <motion.img
            src={banner2}
            alt="img"
            ref={ref}
            variants={boxVariant}
            animate={control}
            initial="hidden"
            className=""
          ></motion.img>
        </div>
        <div className="bannertext animatetext">
          <h2>Welcome to our Online Fashion Paradise!</h2>
          <p>
            <TypeAnimation
              sequence={[
                `Discover the Ultimate Style Destination - Your One-Stop Fashion Fix! Are you ready to step into a world of fashion like no other? Look no further, as our exclusive clothing e-commerce website has everything you need to make a jaw-dropping fashion statement! We're thrilled to introduce you to a shopping experience that is second to none.`,
                1000,
                "",
              ]}
              speed={50}
              repeat={Infinity}
              className="banner2ptext"
            />
          </p>
        </div>
      </div>
      <div className="bottomimgcover">
        <div className="effectimgcover">
          <img src={bottomimg1} alt="img1" />
          <div className="textcontent">
            <p>SUPPORT</p>
          </div>
        </div>
        <div className="effectimgcover">
          <img src={bottomimg2} alt="img2" />
          <div className="textcontent">
            <p>SALE</p>
          </div>
        </div>
        <div className="effectimgcover">
          <img src={bottomimg3} alt="img3" />
          <div className="textcontent">
            <p>FOLLOW US</p>
          </div>
        </div>
      </div>
    </div>
  );
};
// Get ready to elevate your style with our exclusive collection of trendy clothes that will turn heads and set the fashion bar high. Embrace the latest must-haves and express your unique personality with our handpicked selection of on-point pieces.

export default Home;
