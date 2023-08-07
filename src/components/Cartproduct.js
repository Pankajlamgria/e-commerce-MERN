import React from 'react'
import "../css/cart.css";
import loadingimg from "../image/loading.png"
import webcontext from '../context/Ewebcontext';
import { useContext } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import { useState } from 'react';
const Cartproduct = (props) => {
    const [loading, setloading] = useState(true);
    const [quantitystate,setquantitystate]=useState({quantity:props.cartproduct.quantity});
    const history=useHistory();
    const contextcontent=useContext(webcontext);
    const handlequantitychange=(e)=>{
        setquantitystate({...quantitystate,[e.target.name]:e.target.value});
        contextcontent.updatecart(props.cartproduct._id,e.target.value);
    }
    const handleaddquantity=()=>{
        let val=quantitystate.quantity;
        let subtotalprice=contextcontent.subtotal;
        subtotalprice=subtotalprice+props.cartproduct.currentprice;
        contextcontent.setsubtotal(subtotalprice);
        val=val+1;
        contextcontent.updatecart(props.cartproduct._id,val);
        setquantitystate({quantity:val});
        document.getElementById(`inputqtty${props.cartproduct._id}`).value=(val);
        
    }
    const handlesubquantity=()=>{
        let val=quantitystate.quantity;
        if(val===1){
            contextcontent.deletecart(props.cartproduct._id);
        }
        else{
            val=val-1;
            let subtotalprice=contextcontent.subtotal;
            subtotalprice=subtotalprice-props.cartproduct.currentprice;
            contextcontent.setsubtotal(subtotalprice);
            contextcontent.updatecart(props.cartproduct._id,val);
            setquantitystate({quantity:val});
            document.getElementById(`inputqtty${props.cartproduct._id}`).value=(val);
        }
    }
    const handledeletecart=()=>{
        contextcontent.deletecart(props.cartproduct._id);
    }
    const handledetialedproduct=()=>{
        localStorage.setItem("detailid",props.cartproduct.productdatabaseid);
        history.push("/productdetail")
    }
  return (  
    <div>
    <div id="cartproductcover">
        <div id="cartproductimgsec">
        <div
              className="spinner"
              style={{ display: loading ? "flex" : "none" }}
            >
              <img id="loadingimg" src={loadingimg}  />
            </div>
            <img id="cartproductimg" src={`${props.cartproduct.imgurl}`} alt="img" onClick={handledetialedproduct} style={{ display: loading ? "none" : "block" }}
              onLoad={(e) => {
                setloading(false);
              }} />
        </div>
        <div className="cartproducttextsec">
            <p className='cartproductname' onClick={handledetialedproduct}>{props.cartproduct.name} </p>
            <p className='cartproductprice'>&#8377; {props.cartproduct.currentprice}</p>
            <div className="cartproductbtnsec">
                <div className="changingquantitiy">
                    <button className="minus"onClick={handlesubquantity}>-</button>
                    <input className="quantityinput" id={`inputqtty${props.cartproduct._id}`} type="number" name='quantity' value={quantitystate.quantity} onChange={handlequantitychange} />
                    <button className="plus" onClick={handleaddquantity}>+</button>
                </div>
                <button id="delcartproduct" onClick={handledeletecart}>delete</button>
            </div>
        </div>
    </div>
        <div className="hcartline"></div>
        </div>
  )
}

export default Cartproduct
