import Image from "next/image";
import productPlaceHolder from "../app/assets/product_placeholder.png";

export default function ProductCard({
  headline,
  regularPrice,
  salePrice,
  salePercentage,
  image,
  keyword,
  id,
  cartPopup,
}: {
  headline: string;
  regularPrice: number;
  salePrice: number;
  salePercentage: number;
  image: string;
  keyword: string;
  id: string;
  cartPopup: (state: boolean, id: string) => void;
}) {
  const product = {
    id,
    keyword,
    pricesObj: {
      regularPrice,
      salePrice,
      sale: salePercentage,
    },
    image,
    headline,
  };
  return (
    <div className="max-w-sm bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
      <div className="relative">
        <Image
          className="w-full object-cover h-56"
          src={image}
          alt={keyword}
          width={400}
          height={224}
          onError={(e) => {
            let target = e.target as HTMLImageElement;
            target.onerror = null;
            target.src = productPlaceHolder.src;
          }}
        />
        {salePercentage > 0 && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            {Math.round(salePercentage)}% OFF
          </span>
        )}
      </div>
      <div className="px-6 py-4">
        <h2 className="font-bold text-xl text-gray-900 mb-2">{headline}</h2>
        <div className="flex items-center space-x-4 mb-4">
          <span className="text-xl text-green-600 font-semibold">
            ${Math.round(salePrice)}
          </span>
          {salePrice < regularPrice && (
            <span className="line-through text-gray-500">
              ${Math.round(regularPrice)}
            </span>
          )}
        </div>
        <div className="flex justify-between items-center">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
            #{keyword}
          </span>
          <button
            className="bg-green-600 text-white text-sm font-semibold py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-300"
            onClick={() => cartPopup(true, id)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
