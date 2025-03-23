import CustomerLayout from "@/layouts/customer-layout";
import { Head } from "@inertiajs/react";
import Footer from "@/components/footer";
import { useState } from "react";
import Stepper from "@/components/stepper";
import CoffeeIcon from "@/components/icons/coffe-icon";

export default function Checkout() {
    const [currentStep, setCurrentStep] = useState(2);

    return (
        <>
            <Head title="Checkout" />

            <CustomerLayout>
                <Stepper step={currentStep} />
                <div className="bg-gray-100 w-full mt-6 p-4">
                    <h2 className="text-2xl font-bold">Boking Details</h2>
                    <hr className="text-gray-300 w-full mb-4" />
                    <table className="table-auto border-collapse border border-gray-300 w-full">
                        <thead>
                            <tr className="text-start align-text-top">
                                <th className="border border-gray-300 px-4 py-2 text-start">
                                    Rooms Details
                                </th>
                                <th className="border border-gray-300 px-4 py-2 text-start">
                                    Capacity
                                </th>
                                <th className="border border-gray-300 px-4 py-2 text-start">
                                    Policies
                                </th>
                                <th className="border border-gray-300 px-4 py-2 text-start">
                                    Price Total
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="text-start align-text-top">
                                <td className="border border-gray-300 px-4 py-2 text-start">
                                    <p className="font-semibold text-base">
                                        Deluxe Room with 2 Beds
                                    </p>
                                    <p className="text-base">
                                        Check In: {new Date().toLocaleString()}
                                    </p>
                                    <p className="text-base">
                                        Check Out: {new Date().toLocaleString()}
                                    </p>
                                    <p className="text-base">
                                        Total Nights: 1 Night
                                    </p>
                                </td>
                                <td className="border border-gray-300 px-4 py-2 text-start">
                                    <p className="text-base">Max: 3</p>
                                    <p className="text-base">Include: 2</p>
                                </td>
                                <td className="border border-gray-300 px-4 py-2 text-start">
                                    <div className="mb-3 flex gap-3 items-center">
                                        <CoffeeIcon className="size-6 text-amber-500" />{" "}
                                        <span className="font-extrabold text-amber-500">
                                            Breakfast Included
                                        </span>
                                    </div>
                                </td>
                                <td className="border border-gray-300 px-4 py-2 text-start">
                                    <p className="text-base">USD 100</p>
                                </td>
                            </tr>
                            <tr className="text-start align-text-top">
                                <td
                                    colSpan={3}
                                    className="border border-gray-300 px-4 py-2 text-start"
                                >
                                    <p className="font-semibold text-base">
                                        Rates Details
                                    </p>
                                    <p className="text-base">
                                        {new Date().toLocaleString()} : USD 150
                                    </p>
                                </td>
                                <td className="border border-gray-300 px-4 py-2 text-start">
                                    <p className="text-base">USD 100</p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <Footer />
            </CustomerLayout>
        </>
    );
}
