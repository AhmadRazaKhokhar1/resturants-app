import { SampleProductType } from "@/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface initialState {
    items:SampleProductType[] | null
}

export const initialState:initialState = {
    items:[]
}

export const cartSlice = createSlice({
    name:"cart",
    initialState:initialState,
    reducers:{
        addToCart: (state, action:PayloadAction<SampleProductType>)=>{
             state.items?.push(action.payload)
        },
        removeFromCart:(state, action:PayloadAction<string>)=>{
           state.items?.filter((item)=>(item.id !== action.payload))
        }
    }
})

export const {addToCart, removeFromCart} = cartSlice.actions

export const cartReducer = cartSlice.reducer