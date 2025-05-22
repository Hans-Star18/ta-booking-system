import CustomerLayout from '@/layouts/customer-layout'
import { Head } from '@inertiajs/react'
import Footer from '@/components/footer'
import CoffeeIcon from '@/components/icons/coffe-icon'
import Label from '@/components/form/label'
import Select from '@/components/form/select'
import Radio from '@/components/form/radio'
import Button from '@/components/form/button'
import { useEffect, useState } from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import Currency from '@/components/format/currency'
import BasicAlert from '@/components/alert/basic-alert'
import Anchor from '@/components/form/anchor'

export default function ReservationDetail({ reservation }) {
    const hotel = reservation.hotel
    const room = reservation.room

    const [includedBreakfast, setIncludedBreakfast] = useState(false)
    const [roomRates, setRoomRates] = useState([])
    const [roomCount, setRoomCount] = useState(1)
    const [selectedBeds, setSelectedBeds] = useState([])
    const [needExtraBeds, setNeedExtraBeds] = useState([])
    const [extraBedPrices, setExtraBedPrices] = useState([])
    const [guests, setGuests] = useState([])
    const [adultGuestOptions, setAdultGuestOptions] = useState([
        {
            value: 1,
            label: '1 Adult',
        },
    ])
    const [childGuestOptions, setChildGuestOptions] = useState([
        {
            value: 0,
            label: '0 Child',
        },
    ])

    useEffect(() => {
        const allotmentCount = parseInt(reservation.allotment)

        setIncludedBreakfast(
            room.amenities.some((amenity) =>
                amenity.name.toLowerCase().includes('breakfast')
            )
        )
        setAdultGuestOptions(
            Array.from({ length: room.max_occupancy }, (_, i) => ({
                value: i + 1,
                label: `${i + 1} Adult`,
            }))
        )
        setChildGuestOptions(
            Array.from({ length: room.max_occupancy }, (_, i) => ({
                value: i,
                label: `${i} Child`,
            }))
        )
        setRoomRates(
            Array.from({ length: reservation.total_nights }, (_, index) => {
                const date = new Date(reservation.check_in)
                date.setDate(date.getDate() + index)
                return {
                    date: date.toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                    }),
                    price: room.price || 0,
                }
            })
        )
        setRoomCount(allotmentCount)
        const initialGuests = Array.from({ length: allotmentCount }, () => ({
            adult: 1,
            child: 0,
        }))
        setGuests(initialGuests)

        setSelectedBeds(
            Array.from({ length: allotmentCount }, () => room.beds[0])
        )
        setNeedExtraBeds(Array.from({ length: allotmentCount }, () => false))
        setExtraBedPrices(Array.from({ length: allotmentCount }, () => 0))
    }, [room, reservation])

    useEffect(() => {
        const newNeedExtraBeds = []
        const newExtraBedPrices = []

        guests.forEach((guest, i) => {
            const bed = selectedBeds[i]
            const totalGuest = guest.adult + guest.child

            if (bed && totalGuest > bed.capacity) {
                if (needExtraBeds[i] == false) {
                    BasicAlert({
                        title: 'Extra Bed',
                        text: 'You need extra bed for this room',
                        icon: 'warning',
                    })
                }

                newNeedExtraBeds[i] = true
                newExtraBedPrices[i] =
                    hotel.setting.extra_bed_price *
                    (totalGuest - bed.capacity) *
                    reservation.total_nights
            } else {
                newNeedExtraBeds[i] = false
                newExtraBedPrices[i] = 0
            }
        })

        setNeedExtraBeds(newNeedExtraBeds)
        setExtraBedPrices(newExtraBedPrices)
    }, [guests, selectedBeds])

    const handleSelectedGuests = (index, type, value) => {
        const updated = [...guests]
        updated[index][type] = parseInt(value)

        const totalGuest = updated[index].adult + updated[index].child

        if (totalGuest > room.max_occupancy) {
            BasicAlert({
                title: 'Max Occupancy',
                text: 'You have exceeded the maximum occupancy for this room',
                icon: 'warning',
            })
            return
        }

        setGuests(updated)
    }

    const subTotal = roomRates.reduce(
        (acc, rate) => acc + rate.price * roomCount,
        0
    )
    const totalExtraBedPrice = extraBedPrices.reduce((sum, val) => sum + val, 0)
    const totalPrice = subTotal + totalExtraBedPrice

    return (
        <>
            <Head title="Reservation Detail" />

            <CustomerLayout currenStep={2} hotel={hotel}>
                <div className="mt-6 w-full rounded-lg bg-gray-100 p-4">
                    <h2 className="text-2xl font-bold">Reservation Details</h2>
                    <hr className="mb-4 w-full text-gray-300" />

                    <div>
                        <div className="mb-3">
                            <div className="grid grid-cols-1 md:grid-cols-6">
                                <div className="border border-gray-300 px-4 py-2 md:col-span-2 md:px-0">
                                    <p className="text-sm font-semibold md:px-4">
                                        Room Details
                                    </p>
                                    <hr className="mb-2 text-gray-300 md:my-2" />
                                    <div className="md:px-4">
                                        <p className="text-sm font-semibold">
                                            {room.name}
                                        </p>
                                        <p className="text-sm">
                                            Check In: {reservation.check_in}
                                        </p>
                                        <p className="text-sm">
                                            Check Out: {reservation.check_out}
                                        </p>
                                        <p className="text-sm">
                                            Total Nights:{' '}
                                            {reservation.total_nights} Nights
                                        </p>
                                    </div>
                                </div>
                                <div className="border border-gray-300 px-4 py-2 md:px-0">
                                    <p className="text-sm font-semibold md:px-4">
                                        Capacity
                                    </p>
                                    <hr className="mb-2 text-gray-300 md:my-2" />

                                    <div className="md:px-4">
                                        <p className="text-sm">
                                            Max: {room.max_occupancy}
                                        </p>
                                    </div>
                                </div>
                                <div className="border border-gray-300 px-4 py-2 md:col-span-2 md:px-0">
                                    <p className="text-sm font-semibold md:px-4">
                                        Policies
                                    </p>
                                    <hr className="mb-2 text-gray-300 md:my-2" />

                                    <div className="md:px-4">
                                        {includedBreakfast ? (
                                            <div className="mb-3 flex items-center gap-3">
                                                <CoffeeIcon className="size-4 text-amber-500" />{' '}
                                                <span className="font-bold text-amber-500">
                                                    Breakfast Included
                                                </span>
                                            </div>
                                        ) : (
                                            <div className="mb-3 flex items-center gap-3">
                                                <XMarkIcon className="size-4 text-red-500" />{' '}
                                                <span className="font-bold text-red-500">
                                                    Breakfast Not Included
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="border border-gray-300 px-4 py-2 md:px-0">
                                    <p className="text-sm font-semibold md:px-4">
                                        Price{' '}
                                        <span className="hidden md:inline">
                                            Details
                                        </span>{' '}
                                        <span className="md:hidden">Room</span>
                                    </p>
                                    <hr className="mb-2 text-gray-300 md:my-2" />

                                    <div className="md:px-4">
                                        <p className="text-sm">
                                            {`${roomCount} Room(s) - `}
                                            <Currency value={subTotal} />
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-6">
                                <div className="border border-b-0 border-gray-300 px-4 py-2 md:col-span-5 md:border">
                                    <p className="text-sm font-semibold">
                                        Rates Details
                                    </p>
                                    <hr className="mb-2 text-gray-300 md:hidden" />
                                    <div className="text-sm">
                                        {roomRates.map((rate) => (
                                            <p
                                                className="text-sm"
                                                key={rate.date}
                                            >
                                                {rate.date} :{' '}
                                                <Currency
                                                    value={
                                                        rate.price * roomCount
                                                    }
                                                />
                                            </p>
                                        ))}
                                    </div>
                                </div>
                                <div className="border border-t-0 border-gray-300 px-4 py-2 md:border">
                                    <p className="text-sm font-semibold md:hidden">
                                        Price Details
                                    </p>
                                    <hr className="mb-2 text-gray-300 md:hidden" />

                                    <p className="text-sm">
                                        <Currency value={subTotal} />
                                    </p>
                                </div>
                            </div>

                            {Array.from({ length: roomCount }, (_, index) => (
                                <div
                                    key={`room-${index}`}
                                    className="grid grid-cols-1 md:grid-cols-6"
                                >
                                    <div className="border border-gray-300 px-4 py-2 md:col-span-2">
                                        <p className="text-sm font-semibold">
                                            Room {index + 1}
                                        </p>
                                        <div className="flex gap-2">
                                            <Select
                                                id={`adult-guest-${index}`}
                                                name={`adult-guest-${index}`}
                                                className="h-8 w-24 rounded-sm px-2 py-1"
                                                options={adultGuestOptions}
                                                value={guests[index]?.adult}
                                                onChange={(e) => {
                                                    handleSelectedGuests(
                                                        index,
                                                        'adult',
                                                        e.target.value
                                                    )
                                                }}
                                            />
                                            <Select
                                                id={`child-guest-${index}`}
                                                name={`child-guest-${index}`}
                                                className="h-8 w-24 rounded-sm px-2 py-1"
                                                options={childGuestOptions}
                                                value={guests[index]?.child}
                                                onChange={(e) => {
                                                    handleSelectedGuests(
                                                        index,
                                                        'child',
                                                        e.target.value
                                                    )
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="border border-gray-300 px-4 py-2 md:col-span-3">
                                        <p className="text-sm font-semibold">
                                            Bed Config
                                        </p>
                                        <div>
                                            {room.beds.map((bed, bedIdx) => (
                                                <div
                                                    className="flex items-center"
                                                    key={`bed-${index}-${bedIdx}`}
                                                >
                                                    <Radio
                                                        id={`${bed.slug}-${index}`}
                                                        name={`bed-config-${index}`}
                                                        checked={
                                                            selectedBeds[index]
                                                                ?.slug ===
                                                            bed.slug
                                                        }
                                                        onChange={() => {
                                                            const updated = [
                                                                ...selectedBeds,
                                                            ]
                                                            updated[index] = bed
                                                            setSelectedBeds(
                                                                updated
                                                            )
                                                        }}
                                                    />
                                                    <Label
                                                        htmlFor={`${bed.slug}-${index}`}
                                                        className="ms-2 mb-0 text-sm text-gray-900"
                                                    >
                                                        {bed.name} (
                                                        {bed.capacity}{' '}
                                                        {bed.capacity > 1
                                                            ? 'Persons'
                                                            : 'Person'}
                                                        )
                                                    </Label>
                                                </div>
                                            ))}
                                            {needExtraBeds[index] && (
                                                <p className="text-sm text-gray-500 italic">
                                                    * Extra bed confirmed
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="border border-t-0 border-gray-300 px-4 py-2 md:border">
                                        <p className="text-sm font-semibold md:hidden">
                                            Price
                                        </p>
                                        <hr className="mb-2 text-gray-300 md:hidden" />
                                        <div className="flex items-center gap-2 text-sm">
                                            <span className="mb-[2px]">+ </span>
                                            <span>
                                                <Currency
                                                    value={
                                                        extraBedPrices[index]
                                                    }
                                                />
                                            </span>
                                        </div>
                                        <p className="text-sm text-amber-500">
                                            {`Const for ${reservation.total_nights} night${
                                                reservation.total_nights > 1
                                                    ? 's'
                                                    : ''
                                            }`}
                                        </p>
                                    </div>
                                </div>
                            ))}

                            <div className="grid grid-cols-6 bg-blue-200">
                                <div className="col-span-3 border border-gray-300 px-4 py-2 md:col-span-5">
                                    <p className="text-sm font-semibold">
                                        Price Total
                                    </p>
                                </div>
                                <div className="col-span-3 border border-gray-300 px-4 py-2 md:col-span-1">
                                    <p className="text-sm">
                                        <Currency value={totalPrice} />
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end gap-2">
                            <Anchor
                                className={'rounded-sm py-2'}
                                variant="danger"
                                href={route('customer.reservation.index', {
                                    hotel: hotel.uuid,
                                })}
                            >
                                Cancel Reservation
                            </Anchor>

                            <Button
                                className={'rounded-sm py-2'}
                                variant="success"
                            >
                                Book Now
                            </Button>
                        </div>
                    </div>
                </div>

                <Footer />
            </CustomerLayout>
        </>
    )
}
