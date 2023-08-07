import React from "react";
import loadingimg from "../image/loading.png"
import webcontext from "../context/Ewebcontext";
import { useContext,useState} from "react";
import "../css/detailedproduct.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect } from "react";
const Detailedproduct = () => {
  const host="http://localhost:4000";
    const [loading, setloading] = useState(true);
    const history=useHistory();
  const contextcontent = useContext(webcontext);
  const handlebuyproduct=async()=>{
    // const response = await fetch(`${host}/api/buy/buyproduct/${contextcontent.editproductid._id}`, {
    //   method: "GET",  
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });
    // const buyresult=await response.json();
    // if(buyresult.success){
    //   console.log("successful payment");
    //   window.location=buyresult.url;
    // } 
    // else{
    //   console.log(buyresult.error);
    // }

    fetch("http://localhost:4000/api/buy/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify({
      //   items: [
      //     { id: 1, quantity: 3 },
      //     { id: 2, quantity: 1 },
      //   ],
      // }),
      body:JSON.stringify({id:contextcontent.editproductid._id})
    })
      .then(res => {
        if (res.ok) return res.json()
        return res.json().then(json => Promise.reject(json))
      })
      .then(({ url }) => {
        window.location = url
      })
      .catch(e => {
        console.error(e.error)
      })



  }
  const handleaddtocart=()=>{
    if(localStorage.getItem("webtoken")){
        contextcontent.addcart(contextcontent.editproductid._id,1);
    }
    else{
          contextcontent.setalrttext(`login first`);
          contextcontent.setredalrt(true);
        history.push("/");
    }
  }
  useEffect(()=>{
    contextcontent.getdetialedproduct();
  },[])
  return (
    <div id="bigcontofdetial" >
      <div className="detailcontainer">
        <div className="detailimgsec">
        <div
              className="spinner"
              style={{ display: loading ? "flex" : "none" }}
            >
              <img id="loadingimg" src={loadingimg}  />
            </div>
          <img
            id="detailedproductimg"
            src={`${contextcontent.editproductid.imgurl}`}
            style={{ display: loading ? "none" : "block" }}
              onLoad={(e) => {
                setloading(false);
              }}
            alt="img"
          />
        </div>
        <div className="detialtextsec">
          <h2 id="detailproductname">{contextcontent.editproductid.name}</h2>
          <div className="hline"></div>
          <div className="pricesec">
            <p id="percentageoffval">
              -{contextcontent.editproductid.percentageof}%
            </p>
            <p id="priceseccurrent">
              &#8377; {contextcontent.editproductid.currentprice}
            </p>
          </div>
          <p id="pricesenormal">
            MRP: {contextcontent.editproductid.normaldayprice}    
          </p>
          <p id="detailavailable">{contextcontent.editproductid.available}</p>
          <div className="hline"></div>
          <div className="secone">
            <p className="headdetail">Product-type</p>
          <p className="proddetail">{contextcontent.editproductid.producttype}</p>
          </div>
          <div className="secone">
            <p className="headdetail">Brand</p>
          <p className="proddetail">{contextcontent.editproductid.brand}</p>
          </div>
          <div className="secone">
            <p className="headdetail">Material</p>
          <p className="proddetail">{contextcontent.editproductid.material}</p>
          </div>
          <div className="btnsec">
            <button id="addtocartbtn" onClick={handleaddtocart}>Add to cart</button>
            <button id="buybtn" onClick={handlebuyproduct}>Buy now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detailedproduct;
