import React, { useContext, useEffect } from 'react'
import "../css/cart.css"
import webcontext from '../context/Ewebcontext';
import Cartproduct from './Cartproduct';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
const Cart = () => {
  const host="http://localhost:4000";
    const history=useHistory();
    const contextcontent=useContext(webcontext);
    const handleshopnow=()=>{
      history.push("/allproducts");
    }
    useEffect(()=>{
        contextcontent.getcart();
    },[])
    const handlecheckout=async()=>{
      fetch(`${host}/api/buy/checkoutcart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth_token":localStorage.getItem("webtoken"),
      },
    })
      .then(res => {
        if (res.ok) return res.json()
        console.log(res);
        return res.json().then(json => Promise.reject(json))
      })
      .then(({ url }) => {
        window.location = url
      })
      .catch(e => {
        console.error(e.error)
      })


    }

  return (
    <div id="cartcover" >
        <h2 id="shopcartheading">Shoping Cart</h2>
        {/* {console.log(contextcontent.allcart)}; */}
        <h2 id="emptycartheading" onClick={handleshopnow} style={{display:(contextcontent.allcart.length===0)?"block":"none"}}>Empty Cart : Shop now</h2>
        {contextcontent.allcart.map((cartproduct)=>{
          return <Cartproduct key={cartproduct._id} cartproduct={cartproduct}/>
        })}
        <div id="subtotal">
          <button id="checkout" onClick={handlecheckout}>CheckOut</button>
          <span style={{display:(contextcontent.allcart.length===0)?"none":"inline"}}>Subtotal = &#8377; {contextcontent.subtotal} </span>
        </div>
    </div>
  )
}

export default Cart
