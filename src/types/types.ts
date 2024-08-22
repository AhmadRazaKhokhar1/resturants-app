import { MouseEventHandler } from "react"

export type RestaurantCardType = {
    restaurantName:string,
  vicinity:string,
  user_ratings_total?:number,
  rating?:number,
  photoRefrence?:string | any,
  business_status?:string,
  placeId:string,
  isOpen:boolean
}

export type RestaurantCardCallBacksType = {
    getCurrentUserLocation:MouseEventHandler,
     getRestaurantsList:MouseEventHandler
}