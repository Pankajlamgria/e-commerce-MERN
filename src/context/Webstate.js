import React from 'react'
import webcontext from "../context/Ewebcontext.js"
import { useState } from 'react'
const Webstate = (props) => {
    const [editproductid,seteditproductid]=useState({});
    const [subtotal,setsubtotal]=useState(0);
    const host="http://localhost:4000";
    const [homeshirt,sethomeshirt]=useState([]);
    const [allproducts,setallproducts]=useState([]);
    const [homefilter,sethomefilter]=useState([]);
    const [userdetailstate,setuserdetail]=useState([]);
    const [allcart,setallcart]=useState([]);
    const [redalrt,setredalrt]=useState(false);
    const [greenalrt,setgreenalrt]=useState(false);
    const [alrttext,setalrttext]=useState("");
    const shirtdata=async(filter)=>{
      const response = await fetch(`${host}/api/product/findproduct/${filter}`, {
        method: "GET",  
        headers: {
          "Content-Type": "application/json",
        },
      });
      const shirtdatareturn=await response.json();
      if(shirtdatareturn.success){
        sethomeshirt(shirtdatareturn.arraydata);
      }
      else{
        sethomeshirt([]);
        setalrttext(`No result Found`);
        setredalrt(true);
        // alert("No result Found.");
      }
    }
    const productcategory=async()=>{
      const response = await fetch(`${host}/api/product/findproduct/${homefilter}`, {
        method: "GET",  
        headers: {
          "Content-Type": "application/json",
        },
      });
      const shirtdatareturn=await response.json();
      if(shirtdatareturn.success){
        sethomeshirt(shirtdatareturn.arraydata);
      }
      else{
        sethomeshirt([]);
        setalrttext(`No result Found`);
            setredalrt(true);
        // alert("No result Found.");
      }
    }
    const showallproducts=async()=>{
      const response = await fetch(`${host}/api/product/allproducts`, {
        method: "GET",  
        headers: {
          "Content-Type": "application/json",
        },
      });
      const allproductsresult=await response.json();
      if(allproductsresult.success){
        setallproducts(allproductsresult.allproducts);
      }
      else{
        setallproducts([]);
        setalrttext(`No result Found`);
            setredalrt(true);
        // alert("No result Found.");
      }
    }

    const showuserdetails=async()=>{
      const response=await fetch(`${host}/api/auth/userdetails`,{
        method:"GET",
        headers:{
          "Content-Type":"application/json",
          "auth_token":localStorage.getItem("webtoken"),
        },
      });
      const userdetailsresult=await response.json();
      if(userdetailsresult.success){
        setuserdetail(userdetailsresult.newuser);
      }
      else{
        setalrttext(`Some error occured so please login again`);
            setredalrt(true);
        // alert("Some error occured so please login again");

      }
    }

    const deleteproduct=async(id)=>{
      const response=await fetch(`${host}/api/product/deleteproduct/${id}`,{
        method:"DELETE",
        headers:{
          "Content-Type":"application/json",
          "auth_token":localStorage.getItem("webtoken"),
        },
      });
      const userdetailsresult=await response.json();
      if(userdetailsresult.success){
        setalrttext(`Product deleted Successfully.`);
            setgreenalrt(true);
        // alert("Product deleted Successfully.");
      }
      else{
        setalrttext(`Some error occured try again.`);
        setredalrt(true);
        // alert("Some error occured try again.");

      }
    }
    
    const editproduct=async(productdetail,id)=>{
      const response=await fetch(`${host}/api/product/editproduct/${id}`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
          "auth_token":localStorage.getItem("webtoken"),
        },
        body:JSON.stringify({name:productdetail.productname,currentprice:productdetail.currentprice,normaldayprice:productdetail.normaldayprice,percentageof:productdetail.percentageof,available:productdetail.available,producttype:productdetail.producttype,brand:productdetail.brandname,material:productdetail.material})
      });
      const editproductresult=await response.json();
      if(editproductresult.success){
        setalrttext(`Product editted successfully.`);
            setgreenalrt(true);
        // alert("Product editted successfully.");
      }
      else{
        setalrttext(`Some error occured try again.`);
            setredalrt(true);
        // alert("Some error occured try again.");
      }
    }
    const getdetialedproduct=async()=>{
      const id=localStorage.getItem('detailid');
      const response=await fetch(`${host}/api/product/specificproduct/${id}`,{
        method:"GET",
        headers:{
          "Content-Type":"application/json",
        },
        // body:JSON.stringify({name:productdetail.productname,currentprice:productdetail.currentprice,normaldayprice:productdetail.normaldayprice,percentageof:productdetail.percentageof,available:productdetail.available,producttype:productdetail.producttype,brand:productdetail.brandname,material:productdetail.material})
      });
      const getditailresult=await response.json();
      if(getditailresult.success){
        seteditproductid(getditailresult.product);
      }
      else{
        setalrttext(`Some error occured try again.`);
            setredalrt(true);
        // alert("Some error occured try again.");
      }
    }
    
    const addcart=async(id,val)=>{
      const response=await fetch(`${host}/api/cart/addtocart/${id}`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
          "auth_token":localStorage.getItem("webtoken"),
        },
        body:JSON.stringify({quantity:val}),
      });
      const addcartresult=await response.json();
      if(addcartresult.success){
        setalrttext(`Added in the cart successfully.`);
            setgreenalrt(true);
        // alert("Added in the cart successfully.");
      }
      else{
        setalrttext(`Some error occured try again.`);
            setredalrt(true);
        // alert("Some error occured try again.");
      }
    }
    
    const getcart=async()=>{
      const response=await fetch(`${host}/api/cart/allcartproduct`,{
        method:"GET",
        headers:{
          "Content-Type":"application/json",
          "auth_token":localStorage.getItem("webtoken"),
        },
      });
      const getcartresult=await response.json();
      if(getcartresult.success){
        setallcart(getcartresult.allcartproduct);
        setsubtotal(getcartresult.subtotal);
      }
      else{
        setallcart([]);
      }

    }
    const deletecart=async(id)=>{
      const response=await fetch(`${host}/api/cart/deletecart/${id}`,{
        method:"DELETE",
        headers:{
          "Content-Type":"application/json",
          "auth_token":localStorage.getItem("webtoken"),
        },
      });
      const deletecartresult=await response.json();
      if(deletecartresult.success){
        await getcart();
      }
      else{
        setalrttext(`Some error occured`);
            setredalrt(true);
        // alert("Some error Occured");
      }

    }
    const updatecart=async(id,quantity)=>{
      const response=await fetch(`${host}/api/cart/update/${id}`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
          "auth_token":localStorage.getItem("webtoken"),
        },
        body:JSON.stringify({quantity:quantity})
      });
      const updateresponse=await response.json();
      await getcart();
    
    }


  return (
    <webcontext.Provider
     value={{host,shirtdata,homeshirt,sethomeshirt,showallproducts,allproducts,homefilter,sethomefilter,productcategory,showuserdetails,userdetailstate,deleteproduct,seteditproductid,editproductid,editproduct,addcart,getcart,setallcart,allcart,deletecart,updatecart,setsubtotal,subtotal,getdetialedproduct,redalrt,setredalrt,greenalrt,setgreenalrt,alrttext,setalrttext}}>
        {props.children}
     </webcontext.Provider>
  )
}

export default Webstate;
