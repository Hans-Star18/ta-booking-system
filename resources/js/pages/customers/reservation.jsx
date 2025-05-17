import CustomerLayout from '@/layouts/customer-layout'
import RoomCard from '@/components/room-card'
import Footer from '@/components/footer'
import AvailabilityCheck from '@/components/availability-check'
import { Head, useForm } from '@inertiajs/react'
import { useState } from 'react'
import HTMLReactParser from 'html-react-parser'
import BasicAlert from '@/components/alert/basic-alert'

export default function Reservation({ hotel }) {
    const { data, setData, post, processing } = useForm({
        check_in: null,
        check_out: null,
    })

    const handleBooking = (roomId) => {
        // if (!checkInDate) {
        //     alert('Silakan isi tanggal check-in terlebih dahulu.')
        //     return
        // }
        // console.log('Booking room', roomId, 'on', checkInDate, checkOutDate)
    }

    const handleCheckAvailability = () => {
        post(route('customer.reservation.check-availability', hotel.uuid), {
            preserveScroll: true,
            onSuccess: (response) => {
                //
            },
            onError: (errors) => {
                BasicAlert({
                    title: 'Validation Error',
                    text: errors?.check_in ?? errors?.check_out,
                    icon: 'warning',
                })
            },
        })
    }

    return (
        <>
            <Head title={`${hotel.name}`} />

            <CustomerLayout currenStep={1} hotel={hotel}>
                <AvailabilityCheck
                    checkInDate={data.check_in}
                    checkOutDate={data.check_out}
                    setCheckInDate={(value) => setData('check_in', value)}
                    setCheckOutDate={(value) => setData('check_out', value)}
                    handleCheckAvailability={handleCheckAvailability}
                    processing={processing}
                />

                <div>
                    {hotel.rooms.map((room, index) => (
                        <RoomCard
                            key={room.id}
                            roomImage={room.cover_image}
                            roomName={room.name}
                            maxOccupancy={room.max_occupancy}
                            beds={room.beds}
                            price={room.price}
                            slidesRaw={room.photos}
                            onBookNow={handleBooking}
                            description={HTMLReactParser(room.description)}
                            amenities={room.amenities}
                        />
                    ))}
                </div>

                <Footer />
            </CustomerLayout>
        </>
    )
}
