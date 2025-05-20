import Footer from '@/components/footer'
import Button from '@/components/form/button'
import { Checkbox } from '@/components/form/checkbox'
import Input from '@/components/form/input'
import Label from '@/components/form/label'
import { Textarea } from '@/components/form/textarea'
import CustomerLayout from '@/layouts/customer-layout'
import { Head } from '@inertiajs/react'

export default function ReservationConfirm() {
    return (
        <>
            <Head title="Reservation Confirmation" />

            <CustomerLayout currenStep={3}>
                <div className="mt-6 w-full bg-gray-100 p-4">
                    <h2 className="text-2xl font-bold">
                        Confirm Your Reservation
                    </h2>
                    <hr className="mb-4 w-full text-gray-300" />

                    <div>
                        <div className="mb-3">
                            <div className="grid grid-cols-1 md:grid-cols-4">
                                <div className="border border-gray-300 px-4 py-2 md:col-span-2 md:px-0">
                                    <p className="text-sm font-semibold md:px-4">
                                        Item
                                    </p>
                                    <hr className="mb-2 text-gray-300 md:my-2" />
                                    <div className="md:px-4">
                                        <p className="text-sm font-semibold">
                                            Deluxe Room with 2 Beds
                                        </p>
                                        <p className="text-sm">
                                            {
                                                new Date()
                                                    .toISOString()
                                                    .split('T')[0]
                                            }{' '}
                                            -{' '}
                                            {
                                                new Date()
                                                    .toISOString()
                                                    .split('T')[0]
                                            }{' '}
                                            (4 Night)
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
                                    <hr className="mb-2 text-gray-300 md:my-2" />

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
                                    <hr className="mb-2 text-gray-300 md:my-2" />

                                    <div className="md:px-4">
                                        <p className="text-sm">USD 1000</p>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-4">
                                <div className="col-span-2 border border-gray-300 px-4 py-2 md:col-span-3">
                                    <p className="text-sm">Subtotal</p>
                                </div>
                                <div className="col-span-2 border border-gray-300 px-4 py-2 md:col-span-1">
                                    <p className="text-sm">USD 100</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-4">
                                <div className="col-span-2 border border-gray-300 px-4 py-2 md:col-span-3">
                                    <p className="text-sm">Tax 5%</p>
                                </div>
                                <div className="col-span-2 border border-gray-300 px-4 py-2 md:col-span-1">
                                    <p className="text-sm">USD 5</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-4">
                                <div className="col-span-2 border border-gray-300 px-4 py-2 md:col-span-3">
                                    <p className="text-sm">Promotion</p>
                                </div>
                                <div className="col-span-2 border border-gray-300 px-4 py-2 md:col-span-1">
                                    <p className="text-sm">USD -2</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-4">
                                <div className="col-span-2 border border-gray-300 px-4 py-2 md:col-span-3">
                                    <p className="text-sm">Total Cost</p>
                                </div>
                                <div className="col-span-2 border border-gray-300 px-4 py-2 md:col-span-1">
                                    <p className="text-sm">USD 105</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-4 bg-blue-200">
                                <div className="col-span-2 border border-gray-300 px-4 py-2 md:col-span-3">
                                    <p className="text-sm font-semibold">
                                        Pay Now (30%)
                                    </p>
                                </div>
                                <div className="col-span-2 border border-gray-300 px-4 py-2 md:col-span-1">
                                    <p className="text-sm font-semibold">
                                        USD 105
                                    </p>
                                </div>
                            </div>
                            <div className="grid grid-cols-4">
                                <div className="col-span-2 border border-gray-300 px-4 py-2 md:col-span-3">
                                    <p className="text-sm">
                                        Balance to be paid at hotel when
                                        check-in
                                    </p>
                                </div>
                                <div className="col-span-2 border border-gray-300 px-4 py-2 md:col-span-1">
                                    <p className="text-sm">USD 105</p>
                                </div>
                            </div>
                        </div>

                        <div className="mb-3 flex flex-col justify-end gap-3 md:flex-row">
                            <Input
                                id={'promotion-code'}
                                name={'promotion-code'}
                                placeholder="Promotion Code"
                                value=""
                                className="h-10 w-full rounded-sm py-2 md:w-fit"
                            />

                            <Button
                                variant="primary"
                                className={'rounded-sm py-2'}
                            >
                                Check Promotion
                            </Button>
                        </div>

                        <div className="mb-3">
                            <h2 className="text-xl font-bold">
                                Personal Information
                            </h2>
                            <hr className="mb-4 w-full text-gray-300" />
                            <div className="mb-3 grid gap-3 md:grid-cols-2 md:gap-6">
                                <div>
                                    <Label htmlFor={'name'} required={true}>
                                        Your Name
                                    </Label>
                                    <Input
                                        id={'name'}
                                        name={'name'}
                                        placeholder="Your Full Name"
                                        value=""
                                    />
                                </div>
                                <div>
                                    <Label htmlFor={'email'} required={true}>
                                        Email
                                    </Label>
                                    <Input
                                        id={'email'}
                                        name={'email'}
                                        type="email"
                                        placeholder="Email Address"
                                        value=""
                                    />
                                </div>
                            </div>

                            <div className="mb-3 grid grid-cols-1">
                                <div>
                                    <Label htmlFor={'address'} required={true}>
                                        Address
                                    </Label>
                                    <Input
                                        id={'address'}
                                        name={'address'}
                                        placeholder="Your Address"
                                        value=""
                                    />
                                </div>
                            </div>

                            <div className="mb-3 grid gap-3 md:grid-cols-2 md:gap-6">
                                <div>
                                    <Label htmlFor={'phone'} required={true}>
                                        Phone Number
                                    </Label>
                                    <Input
                                        id={'phone'}
                                        type="tel"
                                        name={'phone'}
                                        placeholder="Phone Number / Whatsapp Number"
                                        value=""
                                    />
                                </div>
                                <div>
                                    <Label htmlFor={'city'}>
                                        City{' '}
                                        <span className="text-sm text-gray-400">
                                            (Optional)
                                        </span>
                                    </Label>
                                    <Input
                                        id={'city'}
                                        name={'city'}
                                        placeholder="City"
                                        value=""
                                    />
                                </div>
                            </div>

                            <div className="mb-3 grid grid-cols-1">
                                <div>
                                    <Label htmlFor={'request'}>
                                        Request{' '}
                                        <span className="text-sm text-gray-400">
                                            (Optional)
                                        </span>
                                    </Label>
                                    <Textarea
                                        id={'request'}
                                        name={'request'}
                                        placeholder="Comments / Special Request"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <Checkbox
                                    id={'terms'}
                                    name={'terms'}
                                    className={'text-start'}
                                />
                                <Label
                                    htmlFor={'terms'}
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

                        <div className="flex justify-end gap-2">
                            <Button
                                className={'rounded-sm py-2'}
                                variant="danger"
                            >
                                Cancel
                            </Button>

                            <Button
                                className={'rounded-sm py-2'}
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
    )
}
