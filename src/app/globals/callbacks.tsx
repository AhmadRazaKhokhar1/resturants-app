import {
  beefStakeImages,
  chickenStakeImages,
  commonWords,
  friesImages,
  lasagnaImages,
  mashPotatos,
  pizzaImages,
  prices,
  products,
} from "./global-vars";
import { Prices } from "@/types/types";

export function randomIndexGenerator(maxCount: number): number {
  const randomIndex = Math.floor(Math.random() * maxCount);
  return randomIndex;
}
export function generateKeyWord(): string {
    const maxCount = products.length - 1;
    const randomIndex = randomIndexGenerator(maxCount);
    return products[randomIndex];
}
export function generatePrices(): Prices {
    const totalPrices = prices.length;
    const maxCountPrices = totalPrices - 1;
    const randomPriceIndex = randomIndexGenerator(maxCountPrices);
    const randomSalePercentageIndex = randomIndexGenerator(maxCountPrices);
    
    let regularPrice = prices[randomPriceIndex];
    let sale = prices[randomSalePercentageIndex];
    
    let salePercentage = regularPrice * (sale / 100);
    let salePrice = regularPrice - salePercentage;
    const pricesObj = {
        regularPrice: regularPrice,
        salePrice: salePrice,
        sale: salePercentage,
    };

    return pricesObj;
}

export function generateImages(keyword: string): string {
    let productImage = "";
    if (keyword.toLowerCase().includes("beef")) {
        const maxCount = beefStakeImages.length - 1;
        const randomIndex = randomIndexGenerator(maxCount);
        productImage = beefStakeImages[randomIndex];
    }
    else if (keyword.toLowerCase().includes("chicken")) {
        const maxCount = chickenStakeImages.length - 1;
        const randomIndex = randomIndexGenerator(maxCount);
        productImage = chickenStakeImages[randomIndex];
    }
    else if (keyword.toLowerCase().includes("pizza")) {
        const maxCount = pizzaImages.length - 1;
        const randomIndex = randomIndexGenerator(maxCount);
        productImage = pizzaImages[randomIndex];
    }
    else if (keyword.toLowerCase().includes("lasagna")) {
        const maxCount = lasagnaImages.length - 1;
        const randomIndex = randomIndexGenerator(maxCount);
        productImage = lasagnaImages[randomIndex];
    }
    else if (keyword.toLowerCase().includes("fries")) {
        const maxCount = friesImages.length - 1;
        const randomIndex = randomIndexGenerator(maxCount);
        productImage = friesImages[randomIndex];
    }
    else if (keyword.toLowerCase().includes("potatos")) {
        const maxCount = mashPotatos.length - 1;
        const randomIndex = randomIndexGenerator(maxCount);
        productImage = mashPotatos[randomIndex];
    }
    
  return productImage;
}

export function generateProductHealdine(keyword: string): string {
  const maxCount = commonWords.length - 1;
  const randomIndex = randomIndexGenerator(maxCount);
  const specialWord = commonWords[randomIndex];
  const title = `Get The ${specialWord} ${keyword}`;

  return title;
}
