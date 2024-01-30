'use client';

import { client } from "@/lib/sanityClient";
import { Image as SImage } from "sanity";
import ProductCard from "./productCard";

interface IProduct {
  title: string;
  price: number;
  image: SImage;
}

export default async function Home() {

  const getProductionData = async () => {
    const res = await client.fetch(`*[_type=='product']{
    title,
    price,
    image
    }`);
    return res;
  };
  
  
  const data: IProduct[] = await getProductionData();
  
  return (
    <div className="text-white grid grid-cols-[repeat(3,auto)] justify-center gap-x-20">
      {data.map((item, index) => (
        <div key={index}>
          <ProductCard item={item} />
        </div>
      ))}
    </div>
  );
}
