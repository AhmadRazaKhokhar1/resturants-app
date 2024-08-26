import { SampleProductType } from "@/types/types";
import placeHolderImage from '../app/assets/product_placeholder.png'
import Image from "next/image";
import {motion} from "framer-motion";

export default function CartProduct({product, removeFromCart}:{product:SampleProductType, removeFromCart:(id:string)=>void}) {
  return (
    <motion.div animate={{x:-10}}>
      <div className="flex justify-between items-center">
        <span className="w-12 h-12 rounded-full overflow-hidden">
            <Image 
            src={product?.image} 
            alt={product?.headline??"Cart Product"} 
            width={100} 
            height={100} 
            onError={(e)=>{
                let target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src = placeHolderImage.src;
            }} 
            />
        </span>
        <span className="headline font-semibold">{product?.headline}</span>
        <span className="price font-semibold text-gray-600">${Math.round(product?.pricesObj?.salePrice??product?.pricesObj?.regularPrice)}</span>
        <span 
        className="font-extralight text-center flex items-center justify-center bg-red-600 overflow-hidden rounded-full w-4 h-4 text-white p-3"
        onClick={()=>removeFromCart(product?.id)}
        
        >
            X
        </span>
      </div>
    </motion.div>
  )
}
