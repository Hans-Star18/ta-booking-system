import CustomerLayout from "@/layouts/customer-layout";
import Stepper from "@/components/stepper";
import { useState } from "react";
import { Head } from "@inertiajs/react";
import AvaibilityCheck from "@/components/avaibility-check";

export default function Home() {
    const [currentStep, setCurrentStep] = useState(1);

    return (
        <>
            <Head title="Home" />

            <CustomerLayout>
                <Stepper step={currentStep} />
                <AvaibilityCheck />
            </CustomerLayout>
        </>
    );
}
