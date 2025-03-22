import CustomerLayout from "@/layouts/customer-layout";
import Stepper from "@/components/stepper";
import { useState } from "react";
import { Head } from "@inertiajs/react";
import AvaibilityCheck from "@/components/avaibility-check";
import Button from "@/components/form/button";
import CoffeeIcon from "@/components/icons/coffe-icon";
import "react-responsive-modal/styles.css";
import Modal from "react-responsive-modal";
import RoomCard from "@/components/room-card";

export default function Home() {
    const [currentStep, setCurrentStep] = useState(1);
    const [open, setOpen] = useState(false);

    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);

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
                </div>
            </CustomerLayout>
        </>
    );
}
