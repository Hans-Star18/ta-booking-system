import { useEffect, useState, useMemo } from 'react'
import { Modal } from 'react-responsive-modal'
import 'react-responsive-modal/styles.css'
import Button from '@/components/form/button'
import ImageSlider from '@/components/image-slider'
import { CheckIcon } from '@heroicons/react/24/outline'
import Currency from '@/components/format/currency'
import PolicyList from '@/components/policy-list'

export default function RoomCard({
    roomImage,
    roomName,
    maxOccupancy,
    beds,
    price = 0,
    nights = 1,
    description,
    onBookNow,
    slidesRaw = [],
    amenities,
    allotment,
    policies,
    roomPolicies,
}) {
    const [open, setOpen] = useState(false)
    const [includedBreakfast, setIncludedBreakfast] = useState(false)

    const onOpenModal = () => setOpen(true)
    const onCloseModal = () => setOpen(false)

    const slideResult = useMemo(() => {
        const slides = slidesRaw.length > 0 ? slidesRaw : [{ photo: roomImage }]
        return slides.map((slide) => ({
            url: slide?.photo || roomImage,
        }))
    }, [slidesRaw, roomImage])

    const totalPrice = useMemo(() => {
        return price * allotment * nights
    }, [price, allotment, nights])

    return (
        <>
            <div className="mb-6 grid grid-cols-1 overflow-hidden rounded-md bg-gray-100 md:min-h-52 md:grid-cols-4 md:gap-6">
                <div className="mb-3 w-full md:mb-0">
                    <img
                        src={roomImage}
                        alt="room-image"
                        loading="lazy"
                        className="h-full w-full object-cover"
                    />
                </div>
                <div className="col-span-2 mb-3 w-full px-3 md:mb-0 md:px-0 md:py-6">
                    <h1 className="mb-3 text-2xl font-bold">{roomName}</h1>
                    <div className="mb-3 flex flex-wrap gap-4">
                        <PolicyList
                            policies={policies}
                            roomPolicies={roomPolicies}
                        />
                    </div>
                    <div className="mb-3">
                        <p className="text-base">
                            Max Occupancy: {maxOccupancy}
                        </p>
                        <div className="text-base">
                            Bed Config: {beds.map((bed) => bed.name).join(', ')}
                        </div>
                    </div>
                    <Button
                        className="hidden !rounded-sm !px-2 !py-1 md:block"
                        onClick={onOpenModal}
                    >
                        More Information
                    </Button>
                </div>
                <div className="mb-3 flex w-full flex-col justify-center px-3 md:mb-0 md:items-center md:px-0">
                    <h1 className="mb-3 text-2xl font-bold text-amber-500">
                        <Currency value={totalPrice} />
                    </h1>
                    <p className="mb-3 text-base text-amber-500 md:text-center">
                        Cost for {nights} night{nights > 1 ? 's' : ''} and{' '}
                        {allotment} room{allotment > 1 ? 's' : ''}
                    </p>
                    <div className="flex gap-3 md:block md:gap-0">
                        <Button
                            className="!w-fit !rounded-sm !py-1"
                            onClick={onBookNow}
                        >
                            Book Now
                        </Button>

                        <Button
                            className="!rounded-sm !px-2 !py-1 md:hidden"
                            onClick={onOpenModal}
                        >
                            More Information
                        </Button>
                    </div>
                </div>
            </div>

            <Modal
                open={open}
                onClose={onCloseModal}
                center
                classNames={{
                    modal: 'md:w-full rounded-lg',
                }}
            >
                <h2 className="mb-3 text-2xl font-bold">{roomName}</h2>
                <div>
                    <div className="mb-8 flex w-full justify-center">
                        <ImageSlider slides={slideResult} />
                    </div>
                    <div className="w-full">
                        <div className="mb-3">
                            <h4 className="text-lg font-bold">
                                Room Description
                            </h4>
                            <div className="text-sm">{description}</div>
                        </div>
                        <div className="mb-3">
                            <h4 className="text-lg font-bold">
                                Available Beds
                            </h4>
                            <div className="grid grid-cols-2 md:grid-cols-4">
                                {beds.map((bed) => (
                                    <div
                                        className="flex items-center gap-2 text-sm"
                                        key={bed.id}
                                    >
                                        <CheckIcon className="size-3 font-bold" />{' '}
                                        {bed.name}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="mb-3">
                            <h4 className="text-lg font-bold">Amenities</h4>
                            <div className="grid grid-cols-2 md:grid-cols-4">
                                {amenities.map((amenity) => (
                                    <div
                                        className="flex items-center gap-2 text-sm"
                                        key={amenity.id}
                                    >
                                        <CheckIcon className="size-3 font-bold" />{' '}
                                        {amenity.name}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    )
}
