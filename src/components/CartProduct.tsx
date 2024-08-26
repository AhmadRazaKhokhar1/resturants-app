import { SampleProductType } from "@/types/types";

export default function CartProduct({product}:{product:SampleProductType}) {
  return (
    <div>
      <div className="flex justify-between items-center">
        <span className="w-12 h-12 rounded-full overflow-hidden">
            <img src={product?.image} alt={product?.headline??"Cart Product"} />
        </span>
        <span className="headline font-semibold">{product?.headline}</span>
        <span className="price font-bold">${product?.pricesObj?.salePrice??product?.pricesObj?.regularPrice}</span>
      </div>
    </div>
  )
}
