import { SampleProductType } from "@/types/types";

import {
  generateImages,
  generateKeyWord,
  generatePrices,
  generateProductHealdine,
  generateRandomId,
} from "./callbacks";

export function GenerateSampleProducts() :SampleProductType | undefined{
  try {
    const keyword = generateKeyWord();
    const pricesObj = generatePrices();
    const image = generateImages(keyword);
    const headline = generateProductHealdine(keyword);
    const id = generateRandomId();
    const newProduct = {
      id:id,
      keyword,
      pricesObj,
      image,
      headline,
    };
    return newProduct;
  } catch (error) {
    console.log(error);
  }
}
