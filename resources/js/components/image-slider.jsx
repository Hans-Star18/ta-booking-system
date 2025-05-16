import {
    ArrowLeftCircleIcon,
    ArrowRightCircleIcon,
} from '@heroicons/react/24/solid'
import React, { useState } from 'react'
import PeriodIcon from '@/components/icons/period-icon'

export default function ImageSlider({ slides }) {
    const [currentIndex, setCurrentIndex] = useState(0)

    const prevSlide = () => {
        const isFirstSlide = currentIndex === 0
        const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1
        setCurrentIndex(newIndex)
    }

    const nextSlide = () => {
        const isLastSlide = currentIndex === slides.length - 1
        const newIndex = isLastSlide ? 0 : currentIndex + 1
        setCurrentIndex(newIndex)
    }

    const goToSlide = (slideIndex) => {
        setCurrentIndex(slideIndex)
    }

    return (
        <div className="group relative m-auto h-72 w-72 md:h-80 md:w-80">
            <div
                style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
                className="h-full w-full rounded-sm bg-cover bg-center duration-500"
            ></div>
            {/* Left Arrow */}
            <div className="absolute top-[50%] left-5 -translate-x-0 translate-y-[-50%] cursor-pointer rounded-full bg-black/20 p-2 text-white group-hover:block lg:hidden">
                <ArrowLeftCircleIcon onClick={prevSlide} className="size-5" />
            </div>
            {/* Right Arrow */}
            <div className="absolute top-[50%] right-5 -translate-x-0 translate-y-[-50%] cursor-pointer rounded-full bg-black/20 p-2 text-white group-hover:block lg:hidden">
                <ArrowRightCircleIcon onClick={nextSlide} className="size-5" />
            </div>
            <div className="top-4 flex justify-center py-1">
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
    )
}
