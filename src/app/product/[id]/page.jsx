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
const { useParams, useRouter } = require("next/navigation");
const { useState, useEffect } = require("react");
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
const Page = () => {
  const [eCommerce, setECommerce] = useState([]);
  const [products, setProducts] = useState();
  const [ecommen, setECommen] = useState([]);
  const params = useParams();
  const id = params.id;
  const router = useRouter();
  const fetchData = async () => {
    const com = await fetch(`https://dummyjson.com/products/${id}`);
    const data = await com.json();
    setECommerce(data);
    setProducts(data.total);
    // console.log(data);
    // const Find = data.products.find((product) => {
    //   product.id === parseInt(params.id);
    // });
    // console.log(Find);
    // setProducts(Find);
  };
  useEffect(() => {
    fetchData();
  }, [id]);
  const fetchData2 = async () => {
    const ecom = await fetch(
      `https://dummyjson.com/products/category/${eCommerce?.category}?limit=4`
    );
    const Data = await ecom.json();
    setECommen(Data?.products);
  };
  // console.log(ecommen, "sdf");
  console.log(eCommerce);

  useEffect(() => {
    fetchData2();
  }, [eCommerce]);

  // console.log(eCommerce, "a;sldkj");
  if (!eCommerce) return null;
  // const product = eCommerce.filter((product) => {
  //   return product.id;
  // });
  return (
    <div>
      <div className="flex justify-center items-center sticky top-0 font-bold text-xl h-16">
        {" "}
        <div
          className="w-[25px] h-[25px] bg-center border-gray-200 shadow-2xl "
          style={{ backgroundImage: `url('bag.svg')` }}
        ></div>
        E-Commerce
        <hr className="sticky top-0"></hr>
      </div>
      <hr className=""></hr>
      <div>
        <div className="  w-fit h-fit">
          <div className="flex text-muted-foreground text-sm pt-8 pb-6 pl-100 ">
            <div
              onClick={() => {
                router.push(`/`);
              }}
            >
              Home /
            </div>
            <div className="flex">
              <div
                onClick={() => {
                  router.push(`/products`);
                }}
              >
                {" "}
                Products /
              </div>
              <div>{eCommerce.title}</div>
            </div>
          </div>
          <div className="flex justify-center  ">
            <div className=" pl-100 ">
              {" "}
              <div className="w-[800px] h-[800px] ">
                <img
                  className="object-cover   border rounded-lg bg-muted"
                  src={eCommerce.images}
                />
              </div>
            </div>
            <div className="flex flex-col pl-10 gap-4">
              <div>
                <div className="flex font-extrabold text-3xl">
                  {eCommerce.title}
                </div>
                <div className="flex gap-2">
                  Rating:{eCommerce.rating}
                  <div className="text-muted-foreground text-sm">
                    Brand:{eCommerce.brand}
                  </div>
                </div>
              </div>
              <div className="text-3xl font-bold">${eCommerce.price}</div>
              <div className="text-muted-foreground flex-wrap">
                {eCommerce.description}
              </div>
              <div className="flex font-bold text-sm">
                Availability:
                <div className="text-green-500">
                  {eCommerce.availabilityStatus}
                </div>
              </div>
              <div className="flex-col font-bold text-sm ">
                <div className="gap-2"> Quantity</div>
                <Select className=" ">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="1" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="4">4</SelectItem>
                    <SelectItem value="5">5</SelectItem>
                    <SelectItem value="6">6</SelectItem>
                    <SelectItem value="7">7</SelectItem>
                    <SelectItem value="8">8</SelectItem>
                    <SelectItem value="9">9</SelectItem>
                    <SelectItem value="10">10</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2">
                <Button>Add to Cart</Button>
                <Button variant="ghost">Add to Wishlist</Button>
              </div>
              <hr />
              <div>
                <div
                  className="w-[25px] h-[25px] bg-center border-gray-200 "
                  style={{ backgroundImage: `url('car.svg')` }}
                ></div>
                Free Shipping
                <div>Free standard shipping on orders over $50</div>
              </div>
              <div className="">
                <div
                  className="w-[25px] h-[25px] bg-center border-gray-200 flex"
                  style={{ backgroundImage: `url('sheild.svg')` }}
                ></div>
                30-Day Returns
                <div>Shop with confidence with our 30-day return policy</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="pl-100 text-3xl font-bold pt-10 pb-10">
          {" "}
          Related Products
        </div>
        <div className="flex flex-wrap gap-6 justify-center items-center ml-70 w-[1600px] ">
          {ecommen.map((product) => {
            return (
              <div key={product.id}>
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
        <hr className="border-1 border-gray-200 w-full mt-10 "></hr>
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
    </div>
  );
};
export default Page;
//
