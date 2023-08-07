import React, { useContext, useState } from 'react'
import "../css/search.css"
import webcontext from '../context/Ewebcontext'
import Homeproduct from './Homeproduct';
import { useEffect } from 'react';
const Search = () => {
  const contextcontent=useContext(webcontext);
  const [searchval,setsearchval]=useState({searchinput:""});
  const handlesearchchange=(e)=>{
    setsearchval({...searchval,[e.target.name]:e.target.value});
  }
  useEffect(()=>{
    contextcontent.sethomeshirt([]);
  },[])
  const searchtext=async(e)=>{
    if(e.key==="Enter"){
      await contextcontent.shirtdata(`${searchval.searchinput.toUpperCase()}`);
    }
  }
  return (
    <div style={{marginTop:"5rem",marginBottom:"2rem"}}>
      <div className="searchcover">
      <input type="text" name='searchinput' id='searchinput' onChange={handlesearchchange} onKeyDown={searchtext} />
      </div>
      <div className="searchresult">
          {contextcontent.homeshirt.map((findproductresult)=>{
            return <Homeproduct id={findproductresult.id} product={findproductresult}></Homeproduct>
          })}
      </div>
    </div>
  )
}

export default Search
