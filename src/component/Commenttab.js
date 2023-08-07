import React from 'react'
import "../css/comment.css";


const Commenttab = (props) => {
  return (
    <div className='singlecomment'>
      <p>{props.comment.name} - {props.comment.comment}</p>
    </div>
  )
}

export default Commenttab
