import React, { useContext } from 'react'
import Homeproduct from './Homeproduct'
import { useEffect } from 'react'
import webcontext from '../context/Ewebcontext'
const Product = () => {
    const contextcontent=useContext(webcontext);
    useEffect(()=>{
        contextcontent.productcategory();
    },[contextcontent.homefilter]);
    return (
    <div className='settopmarginall'>
      <div className="searchresult">
          {contextcontent.homeshirt.map((findproductresult)=>{
            return <Homeproduct id={findproductresult.id} product={findproductresult}></Homeproduct>
          })}
      </div>
    </div>
  )
}

export default Product
