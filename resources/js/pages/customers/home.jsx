import CustomerLayout from "@/layouts/customer-layout";
import { Head } from "@inertiajs/react";
import AvaibilityCheck from "@/components/avaibility-check";
import RoomCard from "@/components/room-card";
import Footer from "@/components/footer";

export default function Home() {
    return (
        <>
            <Head title="Home" />

            <CustomerLayout currenStep={1}>
                <AvaibilityCheck />

                <div>
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
