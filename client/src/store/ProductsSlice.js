import {createSlice} from '@reduxjs/toolkit'


const initialState={
    products:null
}

const ProductsSlice =createSlice({
  name:'products',
  initialState,
  reducers:{
    getProducts:(state,action)=>{
        state.products = action.payload
    }
  }
})

export const {getProducts} = ProductsSlice.actions
export default ProductsSlice.reducer