"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Images } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Page from "./product/[id]/page";

export default function Home() {
  const [products, setProducts] = useState([]);
  const router = useRouter();
  const fetchData = async () => {
    const data = await fetch(`https://dummyjson.com/products?limit=4`);
    const Data = await data.json();
    setProducts(Data.products);
  };
  useEffect(() => {
    fetchData();
  }, []);
  console.log(products);

  return (
    <div className="">
      <div className="flex justify-center items-center sticky top-0 font-bold text-xl h-16">
        {" "}
        <div
          className="w-[25px] h-[25px] bg-center border-gray-200 shadow-2xl "
          style={{ backgroundImage: `url('bag.svg')` }}
        ></div>
        E-Commerce
        <hr className="sticky top-0"></hr>
      </div>
      <div className="flex flex-col space-y-4 gap-6 items-center justify-center w-full py-12 md:py-24">
        <div className="space-y-2 flex-col items-center justify-center">
          <div className="text-3xl font-bold tracking-tighter text-center md:text-4xl">
            Featured Products
          </div>
          <div className="text-muted-foreground md:text-xl">
            Check out our most popular items that customers love.
          </div>
        </div>

        <div className="flex gap-6">
          {products.map((products) => {
            return (
              <div className="" key={products.id}>
                <div>
                  <Card>
                    <img className="h-80 w-fit" src={products.images} />
                    <div className="gap-2">
                      {" "}
                      <div className=" pl-4 font-semibold text-lg">
                        {products.title}
                      </div>
                      <div className="pl-4 text-muted-foreground text-sm capitalize">
                        {products.category}
                      </div>
                    </div>
                    <div className="font-bold flex gap-6 p-4 justify-between ">
                      ${products.price}
                      <div>
                        <Button
                          onClick={() => {
                            router.push(`/product/${products.id}`);
                          }}
                          className="shadow-xs "
                        >
                          Veiw Details
                        </Button>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            );
          })}
        </div>
        <div className="gap-2">
          <Button
            onClick={() => {
              router.push("products");
            }}
          >
            Veiw All Products
          </Button>
        </div>
      </div>
      <hr className="border-1 border-gray-200 w-full mt-20 "></hr>
      <div className="flex justify-evenly items-center gap-200 pt-5  ">
        {" "}
        <div className="text-sm text-muted-foreground">
          © 2025 E-Commerce. All rights reserved.
        </div>
        <div className="flex gap-4">
          {" "}
          <div
            className="w-[25px] h-[25px] bg-center border-gray-200 "
            style={{ backgroundImage: `url('link.svg')` }}
          ></div>
          <div
            className="w-[25px] h-[25px] bg-center border-gray-200 "
            style={{ backgroundImage: `url('link.svg')` }}
          ></div>
          <div
            className="w-[25px] h-[25px] bg-center border-gray-200 "
            style={{ backgroundImage: `url('link.svg')` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
//Product
