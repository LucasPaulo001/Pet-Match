"use client";

import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Slider() {
  return (
    <div className="w-full max-w-5xl mx-auto overflow-hidden px-4">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 4500,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        navigation
        className="w-full h-[400px] rounded-2xl"
      >
        <SwiperSlide>
          <img
            src="slider01.jpg"
            alt="Slide 1"
            className="w-full h-full object-cover rounded-2xl"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="/slider02.jpg"
            alt="Slide 2"
            className="w-full h-full object-cover rounded-2xl"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
