"use client";
import { useEffect, useState } from "react";
import { GenerateSampleProducts } from "../globals/sample-products";
import { SampleProductType } from "@/types/types";
import { randomIndexGenerator } from "../globals/callbacks";
import ProductCard from "@/components/ProductCard";
export default function Products(searchParams:{ restaurantName:string,
  vicinity:string,
  user_ratings_total:number,
  rating:number,
  photoRefrence:number,
  business_status:string,
  placeId:string,
}) {
  const [products, setProducts] = useState<SampleProductType[]>([]);
  console.log({searchParams})

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
