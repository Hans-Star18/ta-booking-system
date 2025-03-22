import CustomerLayout from "@/layouts/customer-layout";
import Stepper from "@/components/stepper";
import { useState } from "react";
import { Head } from "@inertiajs/react";
import Input from "@/components/form/input";

export default function Home() {
    const [currentStep, setCurrentStep] = useState(1);

    const [dateOfBirth, setDateOfBirth] = useState("");

    const handleDateChange = (date) => {
        setDateOfBirth(date.toLocaleDateString()); // Handle selected date and format it
    };

    return (
        <>
            <Head title="Home"></Head>

            <CustomerLayout>
                <Stepper step={currentStep} />

                <div className="w-full bg-blue-300 my-6 p-6 rounded-md">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-10">
                        <div className="relative">
                            <Input
                                id={"check-in"}
                                name={"check-in"}
                                placeholder="Check In"
                                type="date"
                                className="bg-white"
                            />

                            <span className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="size-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
                                    />
                                </svg>
                            </span>
                        </div>
                        <div className="relative">
                            <Input
                                id={"check-out"}
                                name={"check-out"}
                                placeholder="Check Out"
                                type="date"
                                className="bg-white"
                            />

                            <span className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="size-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
                                    />
                                </svg>
                            </span>
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
