import {
    ArrowLeftCircleIcon,
    ArrowRightCircleIcon,
} from "@heroicons/react/24/solid";
import React, { useState } from "react";
import PeriodIcon from "@/components/icons/period-icon";

export default function ImageSlider({ slides }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const prevSlide = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const nextSlide = () => {
        const isLastSlide = currentIndex === slides.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    const goToSlide = (slideIndex) => {
        setCurrentIndex(slideIndex);
    };

    return (
        <div className="w-72 h-72 md:w-96 md:h-96 m-auto relative group ">
            <div
                style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
                className="w-full h-full rounded-sm bg-center bg-cover duration-500"
            ></div>
            {/* Left Arrow */}
            <div className="lg:hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 rounded-full p-2 bg-black/20 text-white cursor-pointer">
                <ArrowLeftCircleIcon onClick={prevSlide} className="size-5" />
            </div>
            {/* Right Arrow */}
            <div className="lg:hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 rounded-full p-2 bg-black/20 text-white cursor-pointer">
                <ArrowRightCircleIcon onClick={nextSlide} className="size-5" />
            </div>
            <div className="flex top-4 justify-center py-1">
                {slides.map((slide, slideIndex) => (
                    <div
                        key={slideIndex}
                        onClick={() => goToSlide(slideIndex)}
                        className="cursor-pointer"
                    >
                        <PeriodIcon className="size-5" />
                    </div>
                ))}
            </div>
        </div>
    );
}
