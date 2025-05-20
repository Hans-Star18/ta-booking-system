import CustomerLayout from '@/layouts/customer-layout'
import RoomCard from '@/components/room-card'
import Footer from '@/components/footer'
import AvailabilityCheck from '@/components/availability-check'
import { Head, useForm } from '@inertiajs/react'
import HTMLReactParser from 'html-react-parser'
import BasicAlert from '@/components/alert/basic-alert'

export default function Reservation({ hotel }) {
    const searchParams = new URLSearchParams(window.location.search)

    const { data, setData, get, processing } = useForm({
        check_in: searchParams.get('check_in')
            ? new Date(searchParams.get('check_in'))
            : null,
        check_out: searchParams.get('check_out')
            ? new Date(searchParams.get('check_out'))
            : null,
    })

    const handleBooking = (roomId) => {
        if (!data.check_in) {
            alert('Silakan isi tanggal check-in terlebih dahulu.')
            return
        }
        console.log('Booking room', roomId, 'on', data.check_in, data.check_out)
    }

    const handleCheckAvailability = () => {
        get(route('customer.reservation.check-availability', hotel.uuid), {
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
                    {hotel.rooms && hotel.rooms.length > 0 ? (
                        hotel.rooms.map((room, index) => (
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
                            />
                        ))
                    ) : (
                        <div className="py-8 text-center">
                            <p className="text-gray-600">
                                Tidak ada kamar yang tersedia saat ini.
                            </p>
                        </div>
                    )}
                </div>

                <Footer />
            </CustomerLayout>
        </>
    )
}
