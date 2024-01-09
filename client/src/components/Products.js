import React from 'react'
import ProductsItem from './ProductsItem'
import classes from '../styles/Products.module.css'
import LoadingSpinner from './LoadingSpinner'
const Products = (props) => {
    let content
    if(props.data === null){
        content = <div className={classes.spinner}><LoadingSpinner/></div>
    }else{
       const arr =props.data.products.edges
         content = arr.map(item=>{
            const html = item.node.bodyHtml.replace(/_image[\s\S]*?-stock-test-product/g,'')
           return <ProductsItem key={item.node.id} html={html} img={item.node.featuredImage.url}/>
         })
    }
   
  return (
    <div className={classes.gridMain}>
    {content}
    </div>
    
  )
  }

export default Products
