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

export default function ReservationDetail({ reservation }) {
    const hotel = reservation.hotel
    const room = reservation.room

    const [includedBreakfast, setIncludedBreakfast] = useState(false)
    const [roomRates, setRoomRates] = useState([])
    const [selectedBed, setSelectedBed] = useState(null)
    const [adultGuest, setAdultGuest] = useState([
        {
            value: '1',
            label: '1 Adult',
        },
    ])
    const [childGuest, setChildGuest] = useState([
        {
            value: '0',
            label: '0 Child',
        },
    ])

    useEffect(() => {
        setIncludedBreakfast(
            room.amenities.some((amenity) =>
                amenity.name.toLowerCase().includes('breakfast')
            )
        )
        setAdultGuest(
            Array.from({ length: room.max_occupancy }, (_, i) => ({
                value: i + 1,
                label: `${i + 1} Adult`,
            }))
        )
        setChildGuest(
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
        setSelectedBed(room.beds[0].slug)
    }, [room.amenities, room.max_occupancy, reservation.total_nights])

    const totalPrice = roomRates.reduce((acc, rate) => acc + rate.price, 0)

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
                                            <Currency value={totalPrice} />
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
                                                <Currency value={rate.price} />
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
                                        <Currency value={totalPrice} />
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-6">
                                <div className="border border-gray-300 px-4 py-2 md:col-span-2">
                                    <p className="text-sm font-semibold">
                                        {room.name}
                                    </p>
                                    <hr className="mb-2 text-gray-300 md:hidden" />
                                    <div className="flex gap-2">
                                        <Select
                                            id={'adult-guest'}
                                            name={'adult-guest'}
                                            className={
                                                'h-8 w-24 rounded-sm px-2 py-1'
                                            }
                                            options={adultGuest}
                                        />

                                        <Select
                                            id={'child-guest'}
                                            name={'child-guest'}
                                            className={
                                                'h-8 w-24 rounded-sm px-2 py-1'
                                            }
                                            options={childGuest}
                                        />
                                    </div>
                                </div>
                                <div className="border border-b-0 border-gray-300 px-4 py-2 md:col-span-3 md:border">
                                    <p className="text-sm font-semibold">
                                        Bed Config
                                    </p>
                                    <hr className="mb-2 text-gray-300 md:hidden" />
                                    <div>
                                        {room.beds.map((bed, index) => (
                                            <div
                                                className="flex items-center"
                                                key={`bed-${bed.slug}-${index}`}
                                            >
                                                <Radio
                                                    id={bed.slug}
                                                    name={'bed-config'}
                                                    checked={
                                                        selectedBed === bed.slug
                                                    }
                                                    onChange={() => {
                                                        setSelectedBed(bed.slug)
                                                    }}
                                                />
                                                <Label
                                                    htmlFor={bed.slug}
                                                    className="ms-2 mb-0 text-sm text-gray-900"
                                                >
                                                    {bed.name} ({bed.capacity}
                                                    {bed.capacity > 1
                                                        ? ' Persons'
                                                        : ' Person'}
                                                    )
                                                </Label>
                                            </div>
                                        ))}

                                        <p className="text-sm text-gray-500 italic">
                                            * Extra bed confirmed
                                        </p>
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
                                                    hotel.setting
                                                        .extra_bed_price
                                                }
                                            />
                                        </span>
                                    </div>
                                    <p className="text-sm text-amber-500">
                                        Const for 1 night
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-6 bg-blue-200">
                                <div className="col-span-3 border border-gray-300 px-4 py-2 md:col-span-5">
                                    <p className="text-sm font-semibold">
                                        Price Total
                                    </p>
                                </div>
                                <div className="col-span-3 border border-gray-300 px-4 py-2 md:col-span-1">
                                    <p className="text-sm">USD 100</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end gap-2">
                            <Button
                                className={'rounded-sm py-2'}
                                variant="primary"
                            >
                                Add More Room
                            </Button>

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
