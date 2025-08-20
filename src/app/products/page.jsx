"use client";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
const PAGE_SIZE = 12;
const Product = () => {
  const [eCom, setECom] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [inputValue, setInputValue] = useState("");
  const router = useRouter();

  const fetchData = async () => {
    let skip = 0;
    if (currentPage > 1) {
      skip = PAGE_SIZE * (currentPage - 1);
    }
    console.log("working");
    let url = "";
    if (inputValue === "") {
      url = `https://dummyjson.com/products?limit=${PAGE_SIZE}&skip=${skip}`;
    } else {
      url = `https://dummyjson.com/products/search?q=${inputValue}`;
    }

    const data = await fetch(url);
    const Data = await data.json();
    setECom(Data.products);
    setTotalPage(Data.total);
  };
  useEffect(() => {
    fetchData();
  }, [currentPage, inputValue]);
  console.log(currentPage);
  console.log(eCom);

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const pageCount = Math.ceil(totalPage / PAGE_SIZE);
  const my_array = Array.from({ length: pageCount }, (_, i) => i + 1);

  return (
    <div>
      <div className="flex justify-center items-center sticky top-0">
        <div
          className="w-[25px] h-[25px] bg-center border-gray-200 shadow-2xl "
          style={{ backgroundImage: `url('bag.svg')` }}
        ></div>
        <div className="flex sticky top-0 justify-center items-center font-bold text-xl h-16">
          E-Commerce
        </div>
        <hr className=""></hr>
      </div>
      <input
        value={inputValue}
        onChange={handleChange}
        placeholder="Search Products..."
        className="pl-4 shadow-xl border-2 w-60  rounded-lg ml-110 mt-5 mb-5"
      />
      <div className="flex flex-wrap gap-6 justify-center items-center ml-80 w-[1600px] ">
        {eCom.map((product) => {
          return (
            <div key={product.id} className="flex c w-fit h-fit shadow-xs">
              <Card>
                <img className=" h-80 w-fit" src={product.images[0]} />
                <CardHeader>
                  <CardTitle>{product.title}</CardTitle>
                  <CardDescription>{product.category}</CardDescription>
                  <CardAction></CardAction>
                </CardHeader>
                <div className="flex justify-evenly">
                  <CardContent>
                    <p>${product.price}</p>
                  </CardContent>
                  <CardFooter>
                    <Button
                      onClick={() => {
                        router.push(`/product/${product.id}`);
                      }}
                    >
                      Veiw All Details
                    </Button>
                  </CardFooter>
                </div>
              </Card>
            </div>
          );
        })}
      </div>
      <div className="justify-center text-center p-2 flex items-center">
        <Button
          variant="ghost"
          onClick={() => {
            setCurrentPage(currentPage - 1);
          }}
          disabled={currentPage === 1}
        >
          <div
            className="w-[25px] h-[25px] bg-center border-gray-200 "
            style={{ backgroundImage: `url('back.svg')` }}
          ></div>
        </Button>
        <div>
          {my_array.map((page) => {
            return (
              <Button
                key={page}
                variant={page === currentPage ? "default" : "secondary"}
                onClick={() => {
                  router.push(`?page=${page}`);
                  setCurrentPage(page);
                }}
              >
                {page}
              </Button>
            );
          })}
        </div>
        <Button
          variant="ghost"
          onClick={() => {
            setCurrentPage(currentPage + 1);
          }}
          disabled={currentPage === Math.ceil(totalPage / PAGE_SIZE)}
        >
          <div
            className="w-[25px] h-[25px] bg-center border-gray-200 "
            style={{ backgroundImage: `url('rigth.svg')` }}
          ></div>
        </Button>
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
};
export default Product;
