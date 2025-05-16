import CustomerLayout from '@/layouts/customer-layout'
import RoomCard from '@/components/room-card'
import Footer from '@/components/footer'
import AvailabilityCheck from '@/components/availability-check'
import { Head } from '@inertiajs/react'
import { useState } from 'react'
import HTMLReactParser from 'html-react-parser'

export default function Reservation({ hotel }) {
    const [checkInDate, setCheckInDate] = useState(null)
    const [checkOutDate, setCheckOutDate] = useState(null)

    const handleBooking = (roomId) => {
        if (!checkInDate) {
            alert('Silakan isi tanggal check-in terlebih dahulu.')
            return
        }

        console.log('Booking room', roomId, 'on', checkInDate, checkOutDate)
        // Misal pakai Inertia redirect
        // router.get(`/booking/${roomId}`, { checkin: checkInDate, checkout: checkOutDate });
    }

    return (
        <>
            <Head title={`${hotel.name}`} />

            <CustomerLayout currenStep={1} hotel={hotel}>
                <AvailabilityCheck
                    checkInDate={checkInDate}
                    checkOutDate={checkOutDate}
                    setCheckInDate={setCheckInDate}
                    setCheckOutDate={setCheckOutDate}
                />

                <div>
                    {/* <RoomCard
                        roomImage={'/image/room.png'}
                        roomName={'Deluxe Room 1'}
                        hasBreakfast={true}
                        maxOccupancy={2}
                        bedConfig={'King'}
                        price={100}
                        onBookNow={handleBooking}
                    />
                    <RoomCard
                        roomImage={'/image/room.png'}
                        roomName={'Deluxe Room 1'}
                        hasBreakfast={true}
                        maxOccupancy={2}
                        bedConfig={'King'}
                        price={100}
                    />
                    <RoomCard
                        roomImage={'/image/room.png'}
                        roomName={'Deluxe Room 1'}
                        hasBreakfast={true}
                        maxOccupancy={2}
                        bedConfig={'King'}
                        price={100}
                    /> */}
                    {hotel.rooms.map((room, index) => (
                        <RoomCard
                            key={room.id}
                            roomImage={room.cover_image}
                            roomName={room.name}
                            // hasBreakfast={
                            //     room?.amenities
                            //         ? room.amenities.some((amenity) =>
                            //               amenity.name
                            //                   .toLowerCase()
                            //                   .includes('breakfast')
                            //           )
                            //         : false
                            // }
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
