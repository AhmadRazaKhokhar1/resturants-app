import { SampleProductType } from "@/types/types";
import Image from "next/image";
import productPlaceHolder from "../app/assets/product_placeholder.png"
import { Dispatch, SetStateAction } from "react";

interface AddToCartInterface {
    isVisible:boolean,
    product:SampleProductType,
    cancelAddToCart: (state:boolean)=>void,
    addToCart:(product:SampleProductType)=>void
}

export default function AddToCartPopup({
    isVisible,
    product,
    cancelAddToCart,
    addToCart
  }: AddToCartInterface) {


    //
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" style={{visibility:isVisible?"hidden":"visible", display:isVisible?"flex":"none"}}>
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
          <div className="flex flex-col items-center">
            <Image
              className="w-full object-cover h-48 rounded"
              src={product.image}
              alt={product.keyword}
              width={300}
              height={150}
              onError={(e) => {
                let target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src = productPlaceHolder.src;
              }}
            />
            <h2 className="font-bold text-xl text-gray-900 mt-4 mb-2">{product.headline}</h2>
            <p className="text-gray-600 mb-4">Are you sure you want to add this item to your cart?</p>
            <div className="flex items-center space-x-4 mb-4">
              <span className="text-lg text-green-600 font-semibold">
                ${Math.round(product.pricesObj.salePrice)}
              </span>
              {product.pricesObj.salePrice < product.pricesObj.regularPrice && (
                <span className="line-through text-gray-500">
                  ${Math.round(product.pricesObj.regularPrice)}
                </span>
              )}
              {product.pricesObj.sale > 0 && (
                <span className="ml-4 bg-red-500 text-white text-sm px-2 py-1 rounded">
                  {Math.round(product.pricesObj.sale)}% OFF
                </span>
              )}
            </div>
            <div className="flex justify-between w-full">
              <button
                className="bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded hover:bg-gray-400 transition-colors duration-300"
                onClick={()=>cancelAddToCart(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-300"
                onClick={()=>addToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }