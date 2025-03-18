import CustomerLayout from "@/layouts/customer-layout";
import Stepper from "@/components/stepper";
import { useState } from "react";
import { Head } from "@inertiajs/react";
import Input from "@/components/form/input";

export default function Home() {
    const [currentStep, setCurrentStep] = useState(1);

    return (
        <>
            <Head title="Home"></Head>

            <CustomerLayout>
                <Stepper step={currentStep} />

                <div className="w-full bg-blue-300 my-6 p-6 rounded-md">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-10">
                        <div>
                            <Input
                                id={"check-in"}
                                name={"check-in"}
                                placeholder="Check In"
                                type="date"
                                className="bg-white"
                            />
                        </div>
                        <div>
                            <Input
                                id={"check-out"}
                                name={"check-out"}
                                placeholder="Check Out"
                                type="date"
                                className="bg-white"
                            />
                        </div>
                        <div className="col-span-2 md:col-span-1">
                            <button className="w-full bg-blue-500 text-white shadow-xs hover:bg-blue-600 inline-flex items-center justify-center gap-2 rounded-lg transition px-4 py-3 text-sm">
                                Check Availability
                            </button>
                        </div>
                    </div>
                </div>
            </CustomerLayout>
        </>
    );
}
