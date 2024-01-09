import React,{useEffect} from 'react'
import Products from './components/Products'
import {getProducts} from './store/ProductsSlice'
import {useDispatch,useSelector} from 'react-redux'

const App = () => {
const dispatch = useDispatch()
const products = useSelector(state=>state.products.products)

  useEffect(()=>{
    fetch('/getproducts').then(response=>response.json()).then(data=>{
      dispatch(getProducts(data.data))
    })
  },[dispatch])


  return (
    <div>
      <Products data={products}/>
    </div>
  )
}

export default App
