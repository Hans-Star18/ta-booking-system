import Footer from "@/components/footer";
import Button from "@/components/form/button";
import { Checkbox } from "@/components/form/checkbox";
import Input from "@/components/form/input";
import Label from "@/components/form/label";
import { Textarea } from "@/components/form/textarea";
import CustomerLayout from "@/layouts/customer-layout";
import { Head } from "@inertiajs/react";

export default function ConfirmCheckout() {
    return (
        <>
            <Head title="Checkout Confirmation" />

            <CustomerLayout currenStep={3}>
                <div className="bg-gray-100 w-full mt-6 p-4">
                    <h2 className="text-2xl font-bold">
                        Confirm Your Reservation
                    </h2>
                    <hr className="text-gray-300 w-full mb-4" />

                    <div>
                        <div className="mb-3">
                            <div className="grid grid-cols-1 md:grid-cols-4">
                                <div className="border border-gray-300 px-4 md:px-0 py-2 md:col-span-2">
                                    <p className="text-sm font-semibold md:px-4">
                                        Item
                                    </p>
                                    <hr className="text-gray-300 mb-2 md:my-2" />
                                    <div className="md:px-4">
                                        <p className="font-semibold text-sm">
                                            Deluxe Room with 2 Beds
                                        </p>
                                        <p className="text-sm">
                                            {new Date().toLocaleString()} -{" "}
                                            {new Date().toLocaleString()} (4
                                            Night)
                                        </p>
                                        <p className="text-sm">Bed: Double</p>
                                        <p className="text-sm">
                                            Policies: Non Refundable
                                        </p>
                                    </div>
                                </div>
                                <div className="border border-gray-300 px-4 py-2 md:px-0">
                                    <p className="text-sm font-semibold md:px-4">
                                        Requirements
                                    </p>
                                    <hr className="text-gray-300 mb-2 md:my-2" />

                                    <div className="md:px-4">
                                        <p className="text-sm">
                                            3 Adult & 1 Child
                                        </p>
                                        <p className="text-sm">
                                            Extra bed confirmed
                                        </p>
                                    </div>
                                </div>
                                <div className="border border-gray-300 px-4 py-2 md:px-0">
                                    <p className="text-sm font-semibold md:px-4">
                                        Total
                                    </p>
                                    <hr className="text-gray-300 mb-2 md:my-2" />

                                    <div className="md:px-4">
                                        <p className="text-sm">USD 1000</p>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-4">
                                <div className="col-span-2 md:col-span-3 border border-gray-300 px-4 py-2">
                                    <p className="text-sm">Subtotal</p>
                                </div>
                                <div className="col-span-2 md:col-span-1 border border-gray-300 px-4 py-2">
                                    <p className="text-sm">USD 100</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-4">
                                <div className="col-span-2 md:col-span-3 border border-gray-300 px-4 py-2">
                                    <p className="text-sm">Tax 5%</p>
                                </div>
                                <div className="col-span-2 md:col-span-1 border border-gray-300 px-4 py-2">
                                    <p className="text-sm">USD 5</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-4">
                                <div className="col-span-2 md:col-span-3 border border-gray-300 px-4 py-2">
                                    <p className="text-sm">Promotion</p>
                                </div>
                                <div className="col-span-2 md:col-span-1 border border-gray-300 px-4 py-2">
                                    <p className="text-sm">USD -2</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-4">
                                <div className="col-span-2 md:col-span-3 border border-gray-300 px-4 py-2">
                                    <p className="text-sm">Total Cost</p>
                                </div>
                                <div className="col-span-2 md:col-span-1 border border-gray-300 px-4 py-2">
                                    <p className="text-sm">USD 105</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-4 bg-blue-200">
                                <div className="col-span-2 md:col-span-3 border border-gray-300 px-4 py-2">
                                    <p className="text-sm font-semibold">
                                        Pay Now (30%)
                                    </p>
                                </div>
                                <div className="col-span-2 md:col-span-1 border border-gray-300 px-4 py-2">
                                    <p className="text-sm font-semibold">
                                        USD 105
                                    </p>
                                </div>
                            </div>
                            <div className="grid grid-cols-4">
                                <div className="col-span-2 md:col-span-3 border border-gray-300 px-4 py-2">
                                    <p className="text-sm">
                                        Balance to be paid at hotel when
                                        check-in
                                    </p>
                                </div>
                                <div className="col-span-2 md:col-span-1 border border-gray-300 px-4 py-2">
                                    <p className="text-sm">USD 105</p>
                                </div>
                            </div>
                        </div>

                        <div className="mb-3 flex flex-col md:flex-row gap-3 justify-end">
                            <Input
                                id={"promotion-code"}
                                name={"promotion-code"}
                                placeholder="Promotion Code"
                                value=""
                                className="w-full md:w-fit rounded-sm py-2 h-10"
                            />

                            <Button
                                variant="primary"
                                className={"rounded-sm py-2"}
                            >
                                Check Promotion
                            </Button>
                        </div>

                        <div className="mb-3">
                            <h2 className="text-xl font-bold">
                                Personal Information
                            </h2>
                            <hr className="text-gray-300 w-full mb-4" />
                            <div className="grid md:grid-cols-2 gap-3 md:gap-6 mb-3">
                                <div>
                                    <Label htmlFor={"name"} required={true}>
                                        Your Name
                                    </Label>
                                    <Input
                                        id={"name"}
                                        name={"name"}
                                        placeholder="Your Full Name"
                                        value=""
                                    />
                                </div>
                                <div>
                                    <Label htmlFor={"email"} required={true}>
                                        Email
                                    </Label>
                                    <Input
                                        id={"email"}
                                        name={"email"}
                                        type="email"
                                        placeholder="Email Address"
                                        value=""
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 mb-3">
                                <div>
                                    <Label htmlFor={"address"} required={true}>
                                        Address
                                    </Label>
                                    <Input
                                        id={"address"}
                                        name={"address"}
                                        placeholder="Your Address"
                                        value=""
                                    />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-3 md:gap-6 mb-3">
                                <div>
                                    <Label htmlFor={"phone"} required={true}>
                                        Phone Number
                                    </Label>
                                    <Input
                                        id={"phone"}
                                        type="tel"
                                        name={"phone"}
                                        placeholder="Phone Number / Whatsapp Number"
                                        value=""
                                    />
                                </div>
                                <div>
                                    <Label htmlFor={"city"}>
                                        City{" "}
                                        <span className="text-sm text-gray-400">
                                            (Optional)
                                        </span>
                                    </Label>
                                    <Input
                                        id={"city"}
                                        name={"city"}
                                        placeholder="City"
                                        value=""
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 mb-3">
                                <div>
                                    <Label htmlFor={"request"}>
                                        Request{" "}
                                        <span className="text-sm text-gray-400">
                                            (Optional)
                                        </span>
                                    </Label>
                                    <Textarea
                                        id={"request"}
                                        name={"request"}
                                        placeholder="Comments / Special Request"
                                    />
                                </div>
                            </div>

                            <div className="flex gap-2 items-center">
                                <Checkbox
                                    id={"terms"}
                                    name={"terms"}
                                    className={"text-start"}
                                />
                                <Label
                                    htmlFor={"terms"}
                                    required={true}
                                    className="m-0 text-sm"
                                >
                                    I acknowledge reading the Cancellation
                                    Policy, Terms & Conditions and I understand
                                    my credit card will be charged according to
                                    the terms stated.
                                </Label>
                            </div>
                        </div>

                        <div className="flex gap-2 justify-end">
                            <Button
                                className={"py-2 rounded-sm"}
                                variant="danger"
                            >
                                Cancel
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
