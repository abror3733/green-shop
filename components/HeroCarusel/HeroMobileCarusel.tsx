"use client";
import React from "react";
import {Swiper, SwiperSlide} from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import "./hero.css";

import {Pagination, Autoplay} from "swiper/modules";
import {Button} from "../Button";
import {BtnArrowIcon} from "@/assets/fonts/Icon";

interface CaruselType {
  id: number;
  text: string;
  title: any;
  description: string;
}

function HeroMobileCarusel() {
  const heroData = [
    {
      id: 1,
      text: "Welcome to GreenShop",
      title: (
        <h2 className="mb-[3px] font-black text-[24px] leading-[29px] text-[#3D3D3D]">
          Let's Make a Better <span className="text-[#46A358]">Planet</span>
        </h2>
      ),
      description: "We are an online plant shop offering a wide range",
    },
    {
      id: 2,
      text: "Welcome to GreenShop",
      title: (
        <h2 className="mb-[3px] font-black text-[24px] leading-[29px] text-[#3D3D3D]">
          Let's Make a Better <span className="text-[#46A358]">Planet</span>
        </h2>
      ),
      description: "We are an online plant shop offering a wide range",
    },
    {
      id: 3,
      text: "Welcome to GreenShop",
      title: (
        <h2 className="mb-[3px] font-black text-[24px] leading-[29px] text-[#3D3D3D]">
          Let's Make a Better <span className="text-[#46A358]">Planet</span>
        </h2>
      ),
      description: "We are an online plant shop offering a wide range",
    },
  ];
  return (
    <div className="md:hidden">
     <Swiper
      pagination={{
        dynamicBullets: true,
      }}
      autoplay={{
        delay: 2000,
        disableOnInteraction: false,
      }}
      modules={[Pagination, Autoplay]}
      className="mySwiper md:hidden"
    >
      {heroData.map((item: CaruselType) => (
        <SwiperSlide
          key={item.id}
          className="hero-mobile-banner pt-[23px] flex items-center justify-start pb-[26px]"
        >
          <div className="w-[206px] text-left">
            <p className="mb-[7px] text-[11px] font-medium leading-[16px]">
              {item.text}
            </p>
            {item.title}
            <p className="mb-[10px] font-normal text-[12px] leading-[18px]">
              {item.description}
            </p>
            <Button
              iconPosition="next"
              icon={<BtnArrowIcon />}
              bgBtn={true}
              buttonWidth={83}
              title="SHOP NOW"
            />
          </div>
        </SwiperSlide>
      ))}
      </Swiper>
    </div>
  );
}

export default HeroMobileCarusel;
