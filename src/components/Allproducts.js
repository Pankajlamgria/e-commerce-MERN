import React, { useContext, useEffect } from 'react'
import webcontext from '../context/Ewebcontext'
import Homeproduct from './Homeproduct';
const Allproducts = () => {
    const contextcontent=useContext(webcontext);
    useEffect(()=>{
        contextcontent.showallproducts();    
    },[])
  return (
    <div className='settopmarginall'>
      <div className="searchresult">
          {contextcontent.allproducts.map((findproductresult)=>{
            return <Homeproduct id={findproductresult.id} product={findproductresult}></Homeproduct>
          })}
      </div>
    </div>
  )
}

export default Allproducts
