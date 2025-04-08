import CustomerLayout from "@/layouts/customer-layout";
import RoomCard from "@/components/room-card";
import Footer from "@/components/footer";
import AvailabilityCheck from "@/components/availability-check";
import { Head } from "@inertiajs/react";
import { useState } from "react";

export default function Home() {
    const [checkInDate, setCheckInDate] = useState(null);
    const [checkOutDate, setCheckOutDate] = useState(null);

    const handleBooking = (roomId) => {
        if (!checkInDate) {
            alert("Silakan isi tanggal check-in terlebih dahulu.");
            return;
        }

        console.log("Booking room", roomId, "on", checkInDate, checkOutDate);
        // Misal pakai Inertia redirect
        // router.get(`/booking/${roomId}`, { checkin: checkInDate, checkout: checkOutDate });
    };

    return (
        <>
            <Head title="Home" />

            <CustomerLayout currenStep={1}>
                <AvailabilityCheck
                    checkInDate={checkInDate}
                    checkOutDate={checkOutDate}
                    setCheckInDate={setCheckInDate}
                    setCheckOutDate={setCheckOutDate}
                />

                <div>
                    <RoomCard
                        roomImage={"/image/room.png"}
                        roomName={"Deluxe Room 1"}
                        hasBreakfast={true}
                        maxOccupancy={2}
                        bedConfig={"King"}
                        price={100}
                        onBookNow={handleBooking}
                    />
                    <RoomCard
                        roomImage={"/image/room.png"}
                        roomName={"Deluxe Room 1"}
                        hasBreakfast={true}
                        maxOccupancy={2}
                        bedConfig={"King"}
                        price={100}
                    />
                    <RoomCard
                        roomImage={"/image/room.png"}
                        roomName={"Deluxe Room 1"}
                        hasBreakfast={true}
                        maxOccupancy={2}
                        bedConfig={"King"}
                        price={100}
                    />
                </div>

                <Footer />
            </CustomerLayout>
        </>
    );
}
