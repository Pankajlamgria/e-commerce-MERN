import React from 'react'
import loadingimg from "../image/loading.png";
import "../css/addproduct.css"
import {storage} from "./firebase";
import {deleteObject, getDownloadURL, ref,uploadBytes} from "firebase/storage";
import { useState } from 'react';
import webcontext from '../context/Ewebcontext';
import { useContext } from 'react';

const Addproduct = () => {
    const contextcontent=useContext(webcontext);
    const host="http://localhost:4000";
    const [imageupload,setimageupload]=useState("");
    const [loading,setloading]=useState(false);
    const [productdata,setproductdata]=useState({productname:"",currentprice:0,normaldayprice:0,percentageof:0,available:"",producttype:"",brandname:"",material:"",imgurl:""})
    const addingdata=async(url)=>{
        if(localStorage.getItem("webtoken")){
        const response=await fetch(`${host}/api/product/addnewproduct`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "auth_token":localStorage.getItem("webtoken"),
            },
            body:JSON.stringify({name:productdata.productname,currentprice:productdata.currentprice,normaldayprice:productdata.normaldayprice,percentageof:productdata.percentageof,available:productdata.available,producttype:productdata.producttype,imgurl:url,brand:productdata.brandname,material:productdata.material,imgname:imageupload.name})
        });
        const addingproductresult=await response.json();
        if(addingproductresult.success){
            contextcontent.setalrttext(`Product has been succesfully added`);
            contextcontent.setgreenalrt(true);
            // alert("Product has been succesfully added");
        }
        else{
            const deleteref=ref(storage,`image/${imageupload.name}`)
            deleteObject(deleteref);
            if((typeof addingproductresult.error)==='string'){
                contextcontent.setalrttext(`${addingproductresult.error}`);
                contextcontent.setredalrt(true);
                // alert(`${addingproductresult.error}`);
            }
            else{
                contextcontent.setalrttext(`Please Enter the details correctly`);
                contextcontent.setredalrt(true);
                // alert("Please Enter the details Correctly");
            }
        }
        }
        else{
            const deleteref=ref(storage,`image/${imageupload.name}`)
            deleteObject(deleteref);
            contextcontent.setalrttext(`login first`);
            contextcontent.setredalrt(true);
            // alert("login first");

        }
    }
    const handlechange=async(e)=>{
        setimageupload(e.target.files[0]);
    }
    const handleproductdatachange=(e)=>{
        setproductdata({...productdata,[e.target.name]:e.target.value});
    }
    const handleupload=async(e)=>{
        setloading(true);
        e.preventDefault();
        if(imageupload===""){
            contextcontent.setalrttext(`add the neccessary components`)
            // alert("add the neccessary components");
            contextcontent.setredalrt(true);
            setloading(false);
            return;
        };
        const imageref=ref(storage,`image/${imageupload.name}`);
        uploadBytes(imageref,imageupload).then((snapshot)=>{
            getDownloadURL(snapshot.ref).then((url)=>{
                addingdata(url);
                setloading(false);
            })
        })

    }
  return (
    <div style={{marginTop:"5rem",marginBottom:"2rem"}}>
        <div id="loadingimgcover" style={{display:loading?"flex":"none"}}>
            <img id='loadingimgofadd' src={loadingimg} />
        </div>
        <form action="" style={{display:loading?"none":"flex"}} id="addproductform">
            <h2>Add New product</h2>
            <div className="imagecontainer">
            <label htmlFor="image">Upload the image *</label>
            <input style={{padding:"0px"}} type="file" name='image' onChange={handlechange}/>
            </div>
            <label htmlFor="productname">Product Name *</label>
            <input type="text" name='productname' id='productname' onChange={handleproductdatachange} />
            <label htmlFor="currentprice">Current price *</label>
            <input type="number" name='currentprice' id='currentprice' onChange={handleproductdatachange} />
            <label htmlFor="normaldayprice">Normal day price *</label>
            <input type="number" name='normaldayprice' id='normaldayprice' onChange={handleproductdatachange} />
            <label htmlFor="percentageof">Percentage off *</label>
            <input type="number" name='percentageof' id='percentageof' onChange={handleproductdatachange} />
            <label htmlFor="available">Available *</label>
            <input type="text" name='available' id='available' onChange={handleproductdatachange} />

            <label htmlFor="producttype">Product type *</label>
            <input type="text" name='producttype' id='producttype' onChange={handleproductdatachange} />
 
            <label htmlFor="brandname">Brandname *</label>
            <input type="text" name='brandname' id='brandname' onChange={handleproductdatachange} />
 
            <label htmlFor="material">Material</label>
            <input type="text" name='material' id='material' onChange={handleproductdatachange}/>
            <button id="addbtn" onClick={handleupload}>Add</button>
        </form>
    </div>
  )
}

export default Addproduct
