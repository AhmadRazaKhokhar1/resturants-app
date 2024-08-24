"use client";
import { useEffect, useState } from "react";
import { GenerateSampleProducts } from "../globals/sample-products";
import { SampleProductType } from "@/types/types";
import { randomIndexGenerator } from "../globals/callbacks";
import ProductCard from "@/components/ProductCard";
import { MdBusiness, MdNearMe, MdPerson, MdStar } from "react-icons/md";
export default function Products({
  searchParams,
}: {
  searchParams: {
    restaurantName: string;
    vicinity: string;
    user_ratings_total: number;
    rating: number;
    photoRefrence: string;
    business_status: string;
    placeId: string;
  };
}) {
  const [products, setProducts] = useState<SampleProductType[]>([]);

  useEffect(() => {
    let maxProducts = 50;
    let randomCount = randomIndexGenerator(maxProducts);
    const randomProducts = [];
    for (let i = 0; i <= randomCount; i++) {
      const newProduct = GenerateSampleProducts();
      randomProducts.push(newProduct);
    }
    setProducts(randomProducts);
  }, []);

  return (
    <div className="self-center flex gap-2 flex-wrap items-center justify-center">
      {/* SHOP BANNER  */}
      <div className="banner w-full h-auto p-0 m-0 bg-white shadow-md rounded-lg overflow-hidden mb-20">
  <div className="img-container w-full h-60 md:h-80 overflow-hidden">
    <img
      src={searchParams.photoRefrence}
      alt={searchParams.restaurantName}
      className="w-full h-full object-cover"
    />
  </div>
  <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-4">
    <div className="text-xl font-extrabold text-gray-800">
      {searchParams.restaurantName}
    </div>
    <div className="flex items-center space-x-2 mt-2 md:mt-0">
      <MdStar color="yellow" size={25} />
      <span className="text-lg font-medium text-gray-600">{searchParams.rating}</span>
    </div>
    <div className="flex items-center space-x-2 mt-2 md:mt-0">
      <MdPerson color="gray" size={25} />
      <span className="text-lg font-medium text-gray-600">{searchParams.user_ratings_total}</span>
    </div>
    <div className="flex items-center space-x-2 mt-2 md:mt-0">
      <MdBusiness color="green" size={25} />
      <span className="text-lg font-medium text-gray-600">{searchParams.business_status}</span>
    </div>
    <div className="flex items-center space-x-2 mt-2 md:mt-0">
      <MdNearMe color="green" size={25} />
      <span className="text-lg font-medium text-gray-600">{searchParams.vicinity}</span>
    </div>
  </div>
</div>
      {/* PRODUCTS  */}
      {products.map((product, index) => {
        return (
          <ProductCard
            key={index}
            headline={product.headline}
            salePrice={product.pricesObj.salePrice}
            regularPrice={product.pricesObj.regularPrice}
            salePercentage={product.pricesObj.sale}
            image={product.image}
            keyword={product.keyword}
          />
        );
      })}
    </div>
  );
}
