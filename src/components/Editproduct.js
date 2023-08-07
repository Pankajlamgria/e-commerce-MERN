import React  from 'react'
import "../css/editproduct.css";
import webcontext from '../context/Ewebcontext';
import { useContext } from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
const Editproduct = () => {
    const history=useHistory();
    const contextcontent=useContext(webcontext);
    const productpreviousdata=contextcontent.editproductid.productdetail;


    const [newdata,setnewdata]=useState({productname:`${productpreviousdata.name}`,currentprice:productpreviousdata.currentprice,normaldayprice:productpreviousdata.normaldayprice,percentageof:productpreviousdata.percentageof,available:`${productpreviousdata.available}`,producttype:`${productpreviousdata.producttype}`,brandname:`${productpreviousdata.brandname}`,material:`${productpreviousdata.material}`});
    const handleproductdatachange=(e)=>{
        setnewdata({...newdata,[e.target.name]:e.target.value});
    }
    const handleedit=(e)=>{
        e.preventDefault();
        contextcontent.editproduct(newdata,contextcontent.editproductid.productdetail._id);
        history.push('/');
    }
  return (
    <div  style={{marginTop:"6rem",marginBottom:"2rem"}}>
      <form action="" id="editproductform">
            <h2>Edit product</h2>
            <label htmlFor="productname">Product Name *</label>
            <input type="text" name='productname' id='productname' onChange={handleproductdatachange}  value={newdata.productname}/>
            <label htmlFor="currentprice">Current price *</label>
            <input type="number" name='currentprice' id='currentprice' onChange={handleproductdatachange}  value={newdata.currentprice}  />
            <label htmlFor="normaldayprice">Normal day price *</label>
            <input type="number" name='normaldayprice' id='normaldayprice' onChange={handleproductdatachange}  value={newdata.normaldayprice} />
            <label htmlFor="percentageof">Percentage off *</label>
            <input type="number" name='percentageof' id='percentageof' onChange={handleproductdatachange}  value={newdata.percentageof} />
            <label htmlFor="available">Available *</label>
            <input type="text" name='available' id='available' onChange={handleproductdatachange}  value={newdata.available} />

            <label htmlFor="producttype">Product type *</label>
            <input type="text" name='producttype' id='producttype' onChange={handleproductdatachange}  value={newdata.producttype} />
 
            <label htmlFor="brandname">Brandname *</label>
            <input type="text" name='brandname' id='brandname' onChange={handleproductdatachange}  value={newdata.brandname} />
 
            <label htmlFor="material">Material</label>
            <input type="text" name='material' id='material' onChange={handleproductdatachange}  value={newdata.material}/>
            <button id="editbtn" onClick={handleedit}>EDIT</button>
        </form>
        </div>
  )
}

export default Editproduct
