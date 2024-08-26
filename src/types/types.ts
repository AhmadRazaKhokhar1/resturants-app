import { MouseEventHandler } from "react";

export type RestaurantCardType = {
  restaurantName: string;
  vicinity: string;
  user_ratings_total?: number;
  rating?: number;
  photoRefrence?: string | any;
  business_status?: string;
  placeId: string;
  isOpen: boolean;
};

export type RestaurantCardCallBacksType = {
  getCurrentUserLocation: MouseEventHandler;
  getRestaurantsList: MouseEventHandler;
};

export type Prices = {
  regularPrice: number;
  salePrice: number;
  sale: number;
};

export type SampleProductType = {
  id:string
  keyword: string;
  pricesObj: Prices;
  image: string;
  headline: string;
};

export type CartContextType = {
  items:SampleProductType[],
  addToCart:(product:SampleProductType)=>void,
  removeFromCart:(id:string)=>void,
  cartPopup:(state:boolean, id:string)=>void,
  isPopupOpen:{
    id:string,
    state:boolean
  },
  clearCart:()=>void
}

export type isPopupOpen = {
  id:string,
  state:boolean
}