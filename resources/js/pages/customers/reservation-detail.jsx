import CustomerLayout from '@/layouts/customer-layout'
import { Head, router, useForm } from '@inertiajs/react'
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
import PolicyList from '@/components/policy-list'

export default function ReservationDetail({ reservation, policies }) {
    if (!reservation) {
        return router.visit(route('customer.home'))
    }

    const hotel = reservation.hotel
    const room = reservation.room

    const { data, setData, post, processing, errors } = useForm({
        selectedBeds: [],
        needExtraBeds: [],
        totalExtraBed: [],
        extraBedPrices: [],
        guests: [],
        totalPrice: 0,
    })

    const [includedBreakfast, setIncludedBreakfast] = useState(false)
    const [roomRates, setRoomRates] = useState([])
    const [roomCount, setRoomCount] = useState(1)
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

    const getValidAdultOptions = (index) => {
        return adultGuestOptions.filter((option) => {
            const childCount = data.guests[index]?.child || 0
            return option.value + childCount <= room.max_occupancy
        })
    }

    const getValidChildOptions = (index) => {
        return childGuestOptions.filter((option) => {
            const adultCount = data.guests[index]?.adult || 1
            return adultCount + option.value <= room.max_occupancy
        })
    }

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
        setData('guests', initialGuests)
        setData(
            'selectedBeds',
            Array.from({ length: allotmentCount }, () => room.beds[0])
        )
        setData(
            'needExtraBeds',
            Array.from({ length: allotmentCount }, () => false)
        )
        setData(
            'extraBedPrices',
            Array.from({ length: allotmentCount }, () => 0)
        )
        setData(
            'totalExtraBed',
            Array.from({ length: allotmentCount }, () => 0)
        )
    }, [room, reservation])

    useEffect(() => {
        const newNeedExtraBeds = []
        const newExtraBedPrices = []
        const newTotalExtraBed = []

        data.guests.forEach((guest, i) => {
            const bed = data.selectedBeds[i]
            const totalGuest = guest.adult + guest.child

            if (bed && totalGuest > bed.capacity) {
                if (data.needExtraBeds[i] == false) {
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
                newTotalExtraBed[i] = totalGuest - bed.capacity
            } else {
                newNeedExtraBeds[i] = false
                newExtraBedPrices[i] = 0
                newTotalExtraBed[i] = 0
            }
        })

        setData('needExtraBeds', newNeedExtraBeds)
        setData('extraBedPrices', newExtraBedPrices)
        setData('totalExtraBed', newTotalExtraBed)
    }, [data.guests, data.selectedBeds])

    const handleSelectedGuests = (index, type, value) => {
        const updated = [...data.guests]
        updated[index][type] = parseInt(value)
        setData('guests', updated)
    }

    const subTotal = roomRates.reduce(
        (acc, rate) => acc + rate.price * roomCount,
        0
    )
    const totalExtraBedPrice = data.extraBedPrices.reduce(
        (sum, val) => sum + val,
        0
    )

    useEffect(() => {
        const totalPrice = subTotal + totalExtraBedPrice
        setData('totalPrice', totalPrice)
    }, [subTotal, totalExtraBedPrice, setData])

    const handleBookNow = (hotelUuid) => {
        post(route('customer.reservation.confirm', { hotel: hotelUuid }))
    }

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
                                        <PolicyList
                                            policies={policies}
                                            roomPolicies={room.policies}
                                        />
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
                                                options={getValidAdultOptions(
                                                    index
                                                )}
                                                defaultValue={
                                                    data.guests[index]?.adult
                                                }
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
                                                options={getValidChildOptions(
                                                    index
                                                )}
                                                defaultValue={
                                                    data.guests[index]?.child
                                                }
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
                                                            data.selectedBeds[
                                                                index
                                                            ]?.slug === bed.slug
                                                        }
                                                        onChange={() => {
                                                            const updated = [
                                                                ...data.selectedBeds,
                                                            ]
                                                            updated[index] = bed
                                                            setData(
                                                                'selectedBeds',
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
                                            {data.needExtraBeds[index] && (
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
                                                        data.extraBedPrices[
                                                            index
                                                        ]
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
                                        <Currency value={data.totalPrice} />
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
                                    action: 'cancel',
                                })}
                            >
                                Cancel Reservation
                            </Anchor>

                            <Button
                                className={'rounded-sm py-2'}
                                variant="success"
                                disabled={processing}
                                onClick={() => {
                                    handleBookNow(hotel.uuid)
                                }}
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
