import productPlaceHolder from "../app/assets/product_placeholder.png";

export default function ProductCard({
  headline,
  regularPrice,
  salePrice,
  salePercentage,
  image,
  keyword,
}: {
  headline: string;
  regularPrice: number;
  salePrice: number;
  salePercentage: number;
  image: string;
  keyword: string;
}) {

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <img
        className="w-full object-cover h-48"
        src={image}
        alt={keyword}
        onError={(e) => {
          let target = e.target as HTMLImageElement
          target.onerror = null;
          target.src = productPlaceHolder.src;
        }}
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{headline}</div>
        <div className="flex items-center">
          <span className="text-gray-700 font-semibold text-lg mr-2">
            {Math.round(salePrice)} $
          </span>
          <span className="line-through text-gray-500 text-sm">
            {Math.round(regularPrice)} $
          </span>
          <span className="ml-4 bg-red-500 text-white text-sm px-2 py-1 rounded">
            {Math.round(salePercentage)}% Off
          </span>
        </div>
      </div>
      <div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          #{keyword}
        </span>
      </div>
    </div>
  );
}
