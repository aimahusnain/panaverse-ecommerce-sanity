'use client'

import Image from "next/image";
import { FC } from "react";
import { urlForImage } from "../../sanity/lib/image";

const ProductCard:FC<{item: any}> = ({item}) => {

const handleAddToCart = async () => {
    const res = await fetch("/api/cart", {
        method: "POST",
        body: JSON.stringify({
            product_id: item._id
        })
    })
    
    const result = await res.json()
    
    console.log(result);
    
}

  return (
    <>
      <Image
        width={200}
        height={300}
        className="max-h-[200px] object-cover object-top"
        src={urlForImage(item.image).url()}
        alt="product"
      />
      <h1>{item.title}</h1>
      <h3>${item.price}</h3>
      <button
        onClick={handleAddToCart}
        className="border px-6 py-2 rounded bg-blue-600 text-white"
      >
        Add to Cart
      </button>
    </>
  );
};

export default ProductCard;
