"use client";
import { useEffect, useState } from "react";
import { GenerateSampleProducts } from "../globals/sample-products";
import { SampleProductType } from "@/types/types";
import { randomIndexGenerator } from "../globals/callbacks";
import ProductCard from "@/components/ProductCard";
export default function poducts() {
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
    <div>
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
