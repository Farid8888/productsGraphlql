import React from 'react'
import CanvasImage from './CanvasImage'
import classes from '../styles/ProductsItem.module.css'

const ProductsItem = (props) => {
  return (
    <div className={classes.item}>
    <div  dangerouslySetInnerHTML={{__html:props.html}}></div>
    <CanvasImage img={props.img}/>
    </div>
  )
}

export default ProductsItem
