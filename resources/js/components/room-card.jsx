import React, { useState } from "react";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import CoffeeIcon from "@/components/icons/coffe-icon";
import Button from "@/components/form/button";
import ImageSlider from "@/components/image-slider";

export default function RoomCard({
    roomImage,
    roomName,
    hasBreakfast = false,
    maxOccupancy,
    bedConfig,
    price = 0,
    currency = "USD",
    nights = 1,
    roomCount = 1,
    description,
    onBookNow,
}) {
    const [open, setOpen] = useState(false);

    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);

    const slides = [
        {
            url: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2620&q=80",
        },
        {
            url: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80",
        },
        {
            url: "https://images.unsplash.com/photo-1661961112951-f2bfd1f253ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2672&q=80",
        },

        {
            url: "https://images.unsplash.com/photo-1512756290469-ec264b7fbf87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2253&q=80",
        },
        {
            url: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2671&q=80",
        },
    ];

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-4 md:gap-3 bg-gray-100 md:h-52 overflow-hidden rounded-md mb-6">
                <div className="w-full mb-3 md:mb-0">
                    <img
                        src={roomImage}
                        alt="room-image"
                        loading="lazy"
                        className="h-full w-full object-cover"
                    />
                </div>
                <div className="w-full col-span-2 md:py-6 px-3 md:px-0 mb-3 md:mb-0">
                    <h1 className="text-2xl font-bold mb-3">{roomName}</h1>
                    {hasBreakfast && (
                        <div className="mb-3 flex gap-3 items-center">
                            <CoffeeIcon className="size-6 text-amber-500" />{" "}
                            <span className="font-extrabold text-amber-500">
                                Breakfast Included
                            </span>
                        </div>
                    )}
                    <div className="mb-3">
                        <p className="text-base">
                            Max Occupancy: {maxOccupancy}
                        </p>
                        <p className="text-base">Bed Config: {bedConfig}</p>
                    </div>
                    <Button
                        className="!px-2 !py-1 !rounded-sm hidden md:block"
                        onClick={onOpenModal}
                    >
                        More Information
                    </Button>
                </div>
                <div className="w-full flex flex-col justify-center md:items-center mb-3 md:mb-0 px-3 md:px-0">
                    <h1 className="text-2xl font-bold text-amber-500 mb-3">
                        {currency} {price}
                    </h1>
                    <p className="text-base text-amber-500 mb-3 md:text-center">
                        Cost for {nights} night{nights > 1 ? "s" : ""} and{" "}
                        {roomCount} room{roomCount > 1 ? "s" : ""}
                    </p>
                    <div className="flex gap-3 md:block md:gap-0">
                        <Button
                            className="!py-1 !rounded-sm !w-fit"
                            onClick={onBookNow}
                        >
                            Book Now
                        </Button>

                        <Button
                            className="!px-2 !py-1 !rounded-sm md:hidden"
                            onClick={onOpenModal}
                        >
                            More Information
                        </Button>
                    </div>
                </div>
            </div>

            <Modal open={open} onClose={onCloseModal} center>
                <h2 className="text-2xl font-bold mb-3">{roomName}</h2>
                <div>
                    <div className="w-full mb-8">
                        {/* <img
                            src={roomImage}
                            alt="room-image"
                            loading="lazy"
                            className="w-full"
                        /> */}
                        <ImageSlider slides={slides} />
                    </div>
                    <div>
                        <h4 className="font-bold text-xl">Room Description</h4>
                        <p>{description}</p>
                    </div>
                </div>
            </Modal>
        </>
    );
}
