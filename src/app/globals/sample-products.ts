import { SampleProductType } from "@/types/types";

import {
  generateImages,
  generateKeyWord,
  generatePrices,
  generateProductHealdine,
} from "./callbacks";

export function GenerateSampleProducts() :SampleProductType{
  try {
    const keyword = generateKeyWord();
    const pricesObj = generatePrices();
    const image = generateImages(keyword);
    const headline = generateProductHealdine(keyword);

    const newProduct = {
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
