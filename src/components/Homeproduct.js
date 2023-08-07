import React, { useContext } from "react";
import "../css/homeproduct.css";
import loadingimg from "../image/loading.png";
import { useState } from "react";
import { storage } from "./firebase";
import { deleteObject, ref } from "firebase/storage";
import webcontext from "../context/Ewebcontext";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
const Homeproduct = (props) => {
  const history=useHistory();
  const contextcontent = useContext(webcontext);
  const [loading, setloading] = useState(true);

  const handleeditproduct=()=>{
    contextcontent.seteditproductid({productdetail:props.product});
    history.push('/editproduct');
  }
  const handledetailedproductshow=()=>{
    localStorage.setItem("detailid",props.product._id);
    contextcontent.getdetialedproduct();
    // localStorage.setitem('detialid',props.product._id);
    history.push("/productdetail");
  }
  const handledeleteproduct = () => {
    const deleteref = ref(storage, `image/${props.product.imgname}`);
    try{
      deleteObject(deleteref);
      contextcontent.deleteproduct(props.product._id);
    }
    catch(error){
      console.log(error);
    }
    document.getElementById(`productcardid${props.product._id}`).style.display="none";
  };
  // const productimg= props.imgurl;
  return (
    <div>
      <div className="productcard" id={`productcardid${props.product._id}`} >
        <div className="productcardimg ">
          <div className="productimgcover" >
            <div
              className="spinner"
              style={{ display: loading ? "flex" : "none" }}
            >
              <img id="loadingimg" src={loadingimg}  />
            </div>
            <img
              id="productimgs"
              src={`${props.product.imgurl}`} onClick={handledetailedproductshow}
              style={{ display: loading ? "none" : "block" }}
              onLoad={(e) => {
                setloading(false);
              }}
              alt={`${props.product.name}  img`}
            />

            <button className="productimgcovertext" onClick={handledetailedproductshow}>Show Details</button>
          </div>

          <h4>{props.product.name}</h4>
          <span>
            <box-icon name="rupee"></box-icon>
            {props.product.currentprice}
          </span>
          <div
            className="options"
            style={{
              display:
                localStorage.getItem("webemail") === "pankajlamgria@gmail.com"
                  ? "block"
                  : "none",
            }}
          >
            <box-icon name="edit-alt" onClick={handleeditproduct}></box-icon>
            <box-icon name="trash" onClick={handledeleteproduct}></box-icon>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homeproduct;
