import React from 'react'
import "../css/footer.css"
import instagram from "../image/instagram.png"
import facebook from "../image/facebook.png"
import twitter from "../image/twitter.png"
import {Link} from "react-router-dom";
const Webfooter = () => {

  return (
    <div>
      <div className="footer">
        <div className="support">
            <a href="https://instagram.com" target='_blank'><img  src={instagram} alt="instagram" /></a>
            <img src={facebook} alt="facebook" />
            <img src={twitter} alt="twitter" />
        </div>
        <div className="firstsec">
                <h3>Company</h3>
                <h5>Who we Are</h5> 
                <h5>Shop</h5> 
        </div>
        <div className="secondsec">
                <h3>For Your</h3>
                <h5>Returns</h5>
                <h5>Send Money</h5>
        </div>
        <div className="contact">
            <h3>Contact Us</h3>
            <h5>sportscraft123@gmail.com</h5>
        </div>
      </div>
    </div>
  )
}

export default Webfooter
