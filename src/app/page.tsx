import { client } from "@/lib/sanityClient";
import Image from "next/image";
import { Image as SImage } from "sanity";
import { urlForImage } from "../../sanity/lib/image";

const getProductionData = async () => {
  const res = await client.fetch(`*[_type=='product'] {
    price,
    _id,
    title,
    image,
    category -> {
    name
    }
  }`);
  return res;
};

interface IProduct {
  title: string;
  _id: string;
  price: number;
  description: string;
  image: SImage;
  category: {
    name: string;
  };
}

export default async function Home() {
  const data: IProduct[] = await getProductionData();

  return (
    <div className="grid grid-cols-[repeat, auto] justify-center gap-x-10">
      {data.map((item, i) => (
          <div>
            <Image
              width={200}
              height={300}
              className="max-h-[200px] object-cover object-top"
              src={urlForImage(item.image).url()}
              alt="product"
            />
            <h1>{item.title}</h1>
            <h3>${item.price}</h3>
            <button className="border px-6 py-2 rounded bg-blue-600 text-white">Add to Cart</button>            
          </div>
      ))}
    </div>
  );
}
