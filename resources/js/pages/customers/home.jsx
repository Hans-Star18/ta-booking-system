import CustomerLayout from "@/layouts/customer-layout";
import { Head } from "@inertiajs/react";
import AvaibilityCheck from "@/components/avaibility-check";
import RoomCard from "@/components/room-card";
import Footer from "@/components/footer";
import { useState } from "react";
import Stepper from "@/components/stepper";

export default function Home() {
    const [currentStep, setCurrentStep] = useState(1);

    return (
        <>
            <Head title="Home" />

            <CustomerLayout>
                <Stepper step={currentStep} />
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
