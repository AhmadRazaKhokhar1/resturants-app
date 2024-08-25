"use client";

import { configureStore } from "@reduxjs/toolkit";

export const makeStore = ()=> {
    try {
        return configureStore({
            reducer:{
                cart:()=>{}
            },
        })
    } catch (error) {
        console.log(error)
    }
}

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = ReturnType<AppStore['dispatch']>;
