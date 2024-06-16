'use client'
import HeroMobileCarusel from "@/components/HeroCarusel/HeroMobileCarusel";
import HeroCarusel from "../components/HeroCarusel"
import RangeSlider from "@/components/RangeSlider";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import CustomTabs from "@/components/CustomTabs";
import { Product } from "@/components/Product/Product";
import { Pagination, Popover } from "antd";
import Loading from "../components/Loading/Loading"

interface CategoryType {
   id: string;
   title: string;
   count: string;
}

interface ProductType {
   id: string;
   title: string;
   price: string;
   image: string;
}

function Home() {
   const [arrow, setArrow] = useState<string>('Show');
   const [categoryData, setCategoryData] = useState<Array<CategoryType>>([])
   const [sizeData, setSizeData] = useState<Array<CategoryType>>([])
   const [products, setProducts] = useState<Array<ProductType>>([])
   const [tagId, setTagId] = useState<string>("")
   const [isLoading, setIsLoading] = useState(false)
   const [categoryId, setCategoryId] = useState<string>('')
   const [sizeId, setSizeId] = useState<string>("0")
   const [sortProduct, setSortProduct] = useState("")

   const mergedArrow = useMemo(() => {
      if (arrow === 'Hide') {
         return false;
      }

      if (arrow === 'Show') {
         return true;
      }

      return {
         pointAtCenter: true,
      };
   }, [arrow]);

   const handleSortClick = (value:string) => {
      setIsLoading(true);
      setTimeout(() => {
         setSortProduct(value)
      }, 500);
   }  

   const handleCategoryClick = (id: string) => {
      setIsLoading(true);
      setTagId("")
      setSizeId("")
      setTimeout(() => {
         setCategoryId(id)
      }, 500);
   }

   const handleSizeClick = (id: string) => {
      setIsLoading(true);
      if (id == "1") {
         setTimeout(() => {
            setCategoryId("");
            setTagId("1");
            setSizeId("")
         }, 500);
      } else {
         setTimeout(() => {
            setCategoryId("");
            setTagId("");
            setSizeId(id)
         }, 500);
      }
   }

   useEffect(() => {
      axios.get(`http://localhost:3001/categoryies`).then(res => {
         setCategoryData(res.data);
      })
      axios.get(`http://localhost:3001/sizes`).then(res => {
         setSizeData(res.data);
      })
   }, [])

   useEffect(() => {
      axios.get(`http://localhost:3001/plant-products?_sort=${sortProduct}&categoryId=${categoryId}&tagId=${tagId}&sizeId=${sizeId}`).then(res => {
         setIsLoading(false);
         setProducts(res.data.map((item: any) => {
            return {
               id: item.id,
               title: item.title,
               price: item.price,
               image: item.images[3]
            }
         }));
      }).catch(err => { setIsLoading(false) })
   }, [categoryId, tagId, sizeId, sortProduct])

   return (
      <>
         <section className="pt-[12px] pb-[46px]">
            <div className="container">
               <HeroCarusel />
               <HeroMobileCarusel />
            </div>
         </section>
         <section className="">
            <div className="container">
               <div className="flex justify-between gap-[50px]">
                  <div className="w-[25%] bg-[#FBFBFB]">
                     <div className="px-[15px]">
                        <h2 className="font-bold text-[18px] leading-[16px] text-[#3D3D3D]">Categories</h2>
                        <ul className="pl-[12px] space-y-[15px] mt-[20px]  mb-[36px]">
                           {categoryData && Array.isArray(categoryData) && categoryData.length > 0 && categoryData.map((item: CategoryType) => (
                              <li key={item.id} onClick={() => handleCategoryClick(item.id)} className={`${categoryId == item.id ? "text-[#46a358]" : ""} flex items-center cursor-pointer justify-between" key={item.id}`}>
                                 <span>{item.title}</span>
                                 <span>({item.count})</span>
                              </li>
                           ))}
                        </ul>
                        <h2 className="font-bold text-[18px] leading-[16px] text-[#3D3D3D] mb-[20px]">Price Range</h2>
                        <RangeSlider />
                        <h2 className="font-bold text-[18px] leading-[16px] text-[#3D3D3D] mt-[46px]">Size</h2>
                        <ul className="pl-[12px] space-y-[15px] mt-[20px]  mb-[36px]">
                           {sizeData && Array.isArray(sizeData) && sizeData.length > 0 && sizeData.map((item: CategoryType) => (
                              <li onClick={() => handleSizeClick(item.id)} className={`flex items-center justify-between cursor-pointer ${sizeId == item.id ? 'text-[#46a368]' : ''}`} key={item.id}>
                                 <span>{item.title}</span>
                                 <span>({item.count})</span>
                              </li>
                           ))}
                        </ul>
                     </div>
                     <Link href={"#"}>
                        <img src="/plant-aside.jpg" alt="Plant Aside" width={"100%"} height={470} />
                     </Link>
                  </div>
                  <div className="w-[75%]">
                     <div className="flex items-center justify-between">
                        <CustomTabs setSizeId={setSizeId} setCategoryId={setCategoryId} setIsLoading={setIsLoading} setTagId={setTagId} />
                        <div className="flex items-center cursor-pointer">
                           <span>Short by:</span>
                           <Popover placement="bottom" title={""} content={<ul className="space-y-3 w-[150px] text-center">
                              <li onClick={() => handleSortClick("title")} className="hover:scale-110 cursor-pointer duration-300 hover:font-bold">Title sort</li>
                              <li onClick={() => handleSortClick("price")} className="hover:scale-110 cursor-pointer duration-300 hover:font-bold">Price sort</li>
                           </ul>} arrow={mergedArrow}>
                              <h2>Default sorting</h2>
                           </Popover>
                        </div>
                     </div>
                     <ul className="mt-[31px] flex gap-[30px] flex-wrap">
                        {isLoading ? <Loading/> : products.length ?
                           products.map((item: ProductType) => (
                              <Product key={item.id} id={item.id} image={item.image} price={item.price} title={item.title} />
                           )) : <strong>EMPTY...</strong>
                        }
                     </ul>
                     <div className="mt-[90px] flex justify-end">
                        <Pagination defaultCurrent={1} total={50} />
                     </div>
                  </div>
               </div>
            </div>
         </section>
      </>
   );
}

export default Home