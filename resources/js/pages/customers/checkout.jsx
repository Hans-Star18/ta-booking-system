import CustomerLayout from "@/layouts/customer-layout";
import { Head } from "@inertiajs/react";
import Footer from "@/components/footer";
import { useState } from "react";
import Stepper from "@/components/stepper";
import CoffeeIcon from "@/components/icons/coffe-icon";
import Label from "@/components/form/label";
import Select from "@/components/form/select";
import Radio from "@/components/form/radio";
import Button from "@/components/form/button";

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

                    <div>
                        <div className="mb-3">
                            <div className="grid grid-cols-6">
                                <div className="col-span-2 border border-gray-300 px-4 py-2">
                                    <p className="text-sm font-semibold">
                                        Rooms Details
                                    </p>
                                </div>
                                <div className="border border-gray-300 px-4 py-2">
                                    <p className="text-sm font-semibold">
                                        Capacity
                                    </p>
                                </div>
                                <div className="col-span-2 border border-gray-300 px-4 py-2">
                                    <p className="text-sm font-semibold">
                                        Policies
                                    </p>
                                </div>
                                <div className="border border-gray-300 px-4 py-2">
                                    <p className="text-sm font-semibold">
                                        Price
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-6">
                                <div className="col-span-2 border border-gray-300 px-4 py-2">
                                    <p className="font-semibold text-sm">
                                        Deluxe Room with 2 Beds
                                    </p>
                                    <p className="text-sm">
                                        Check In: {new Date().toLocaleString()}
                                    </p>
                                    <p className="text-sm">
                                        Check Out: {new Date().toLocaleString()}
                                    </p>
                                    <p className="text-sm">
                                        Total Nights: 1 Night
                                    </p>
                                </div>
                                <div className="border border-gray-300 px-4 py-2">
                                    <p className="text-sm">Max: 3</p>
                                    <p className="text-sm">Include: 2</p>
                                </div>
                                <div className="col-span-2 border border-gray-300 px-4 py-2">
                                    <div className="mb-3 flex gap-3 items-center">
                                        <CoffeeIcon className="size-5 text-amber-500" />{" "}
                                        <span className="font-extrabold text-amber-500 text-sm">
                                            Breakfast Included
                                        </span>
                                    </div>
                                </div>
                                <div className="border border-gray-300 px-4 py-2">
                                    <p className="text-sm">USD 100</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-6">
                                <div className="col-span-5 border border-gray-300 px-4 py-2">
                                    <p className="font-semibold text-sm">
                                        Rates Details
                                    </p>
                                    <p className="text-sm">
                                        {new Date().toLocaleString()} : USD 150
                                    </p>
                                </div>
                                <div className="border border-gray-300 px-4 py-2">
                                    <p className="text-sm">USD 100</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-6">
                                <div className="col-span-2 border border-gray-300 px-4 py-2">
                                    <p className="font-semibold text-sm">
                                        Deluxe Room with 2 Beds
                                    </p>
                                    <div className="flex gap-2">
                                        <Select
                                            id={"adult-guest"}
                                            name={"adult-guest"}
                                            className={
                                                "!h-8 !px-2 !py-1 !rounded-sm"
                                            }
                                            options={[
                                                {
                                                    value: "1",
                                                    label: "1 Adult",
                                                },
                                                {
                                                    value: "2",
                                                    label: "2 Adult",
                                                },
                                                {
                                                    value: "3",
                                                    label: "3 Adult",
                                                },
                                            ]}
                                        />

                                        <Select
                                            id={"child-guest"}
                                            name={"child-guest"}
                                            className={
                                                "!h-8 !px-2 !py-1 !rounded-sm"
                                            }
                                            options={[
                                                {
                                                    value: "1",
                                                    label: "1 Child",
                                                },
                                                {
                                                    value: "2",
                                                    label: "2 Child",
                                                },
                                                {
                                                    value: "3",
                                                    label: "3 Child",
                                                },
                                            ]}
                                        />
                                    </div>
                                </div>
                                <div className="col-span-3 border border-gray-300 px-4 py-2">
                                    <p className="font-semibold text-sm">
                                        Bed Config
                                    </p>
                                    <div>
                                        <div class="flex items-center">
                                            <Radio
                                                id={"bed-config-1"}
                                                name={"bed-config"}
                                            />
                                            <Label
                                                htmlFor={"bed-config-1"}
                                                className="ms-2 mb-0 text-sm text-gray-900"
                                            >
                                                King Bed
                                            </Label>
                                        </div>
                                        <div class="flex items-center">
                                            <Radio
                                                id={"bed-config-2"}
                                                name={"bed-config"}
                                            />
                                            <Label
                                                htmlFor={"bed-config-2"}
                                                className="ms-2 mb-0 text-sm text-gray-900"
                                            >
                                                Twin Bed
                                            </Label>
                                        </div>
                                        <p className="text-sm">
                                            Extra Bed Confirmed
                                        </p>
                                    </div>
                                </div>
                                <div className="border border-gray-300 px-4 py-2">
                                    <p className="text-sm">+ USD 100</p>
                                    <p className="text-sm text-amber-500">
                                        Const for 1 night
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-6">
                                <div className="col-span-5 border border-gray-300 px-4 py-2">
                                    <p className="font-semibold text-sm">
                                        Price Total
                                    </p>
                                </div>
                                <div className="border border-gray-300 px-4 py-2">
                                    <p className="text-sm">USD 100</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-2 justify-end">
                            <Button
                                className={"py-2 rounded-sm"}
                                variant="primary"
                            >
                                Add More Room
                            </Button>

                            <Button
                                className={"py-2 rounded-sm"}
                                variant="success"
                            >
                                Book Now
                            </Button>
                        </div>
                    </div>
                </div>
                <Footer />
            </CustomerLayout>
        </>
    );
}
