import CustomerLayout from '@/layouts/customer-layout'
import RoomCard from '@/components/room-card'
import Footer from '@/components/footer'
import AvailabilityCheck from '@/components/availability-check'
import { Head, useForm } from '@inertiajs/react'
import HTMLReactParser from 'html-react-parser'
import BasicAlert from '@/components/alert/basic-alert'

export default function Reservation({
    hotel,
    hasCheckAvailability = false,
    totalNights = 1,
}) {
    const searchParams = new URLSearchParams(window.location.search)

    const {
        data: availabilityData,
        setData: availabilitySetData,
        get: availabilityGet,
        processing: availabilityProcessing,
    } = useForm({
        check_in: searchParams.get('check_in')
            ? new Date(searchParams.get('check_in'))
            : null,
        check_out: searchParams.get('check_out')
            ? new Date(searchParams.get('check_out'))
            : null,
        allotment: searchParams.get('allotment') ?? 1,
    })

    const { get: bookingGet } = useForm({})

    const handleBooking = (roomId) => {
        if (!hasCheckAvailability) {
            BasicAlert({
                title: 'Validation Error',
                text: 'Please check your check-in and check-out date again.',
                icon: 'warning',
            })
            return
        }

        bookingGet(
            route('customer.reservation.detail', {
                hotel: hotel.uuid,
                room: roomId,
            }),
            {
                preserveScroll: false,
            }
        )
    }

    const handleCheckAvailability = () => {
        availabilityGet(
            route('customer.reservation.check-availability', hotel.uuid),
            {
                preserveScroll: true,
                onError: (errors) => {
                    BasicAlert({
                        title: 'Validation Error',
                        text: errors?.check_in ?? errors?.check_out,
                        icon: 'warning',
                    })
                },
            }
        )
    }

    return (
        <>
            <Head title={`${hotel.name}`} />

            <CustomerLayout currenStep={1} hotel={hotel}>
                <AvailabilityCheck
                    checkInDate={availabilityData.check_in}
                    checkOutDate={availabilityData.check_out}
                    allotment={availabilityData.allotment}
                    setCheckInDate={(value) =>
                        availabilitySetData('check_in', value)
                    }
                    setCheckOutDate={(value) =>
                        availabilitySetData('check_out', value)
                    }
                    setAllotment={(value) =>
                        availabilitySetData('allotment', value)
                    }
                    handleCheckAvailability={handleCheckAvailability}
                    processing={availabilityProcessing}
                />

                <div>
                    {hotel.rooms && hotel.rooms.length > 0 ? (
                        hotel.rooms.map((room) => (
                            <RoomCard
                                key={room.id}
                                roomImage={room.cover_image}
                                roomName={room.name}
                                maxOccupancy={room.max_occupancy}
                                beds={room.beds}
                                price={room.price}
                                slidesRaw={room.photos}
                                onBookNow={() => handleBooking(room.id)}
                                description={HTMLReactParser(room.description)}
                                amenities={room.amenities}
                                allotment={availabilityData.allotment}
                                nights={totalNights}
                            />
                        ))
                    ) : (
                        <div className="py-8 text-center">
                            <p className="text-gray-600">
                                No room available at the moment.
                            </p>
                        </div>
                    )}
                </div>

                <Footer />
            </CustomerLayout>
        </>
    )
}
