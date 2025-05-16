import CustomerLayout from '@/layouts/customer-layout'
import { Head } from '@inertiajs/react'
import Footer from '@/components/footer'
import CoffeeIcon from '@/components/icons/coffe-icon'
import Label from '@/components/form/label'
import Select from '@/components/form/select'
import Radio from '@/components/form/radio'
import Button from '@/components/form/button'

export default function Reservation() {
    return (
        <>
            <Head title="Reservation" />

            <CustomerLayout currenStep={2}>
                <div className="mt-6 w-full bg-gray-100 p-4">
                    <h2 className="text-2xl font-bold">Boking Details</h2>
                    <hr className="mb-4 w-full text-gray-300" />

                    <div>
                        <div className="mb-3">
                            <div className="grid grid-cols-1 md:grid-cols-6">
                                <div className="border border-gray-300 px-4 py-2 md:col-span-2 md:px-0">
                                    <p className="text-sm font-semibold md:px-4">
                                        Rooms Details
                                    </p>
                                    <hr className="mb-2 text-gray-300 md:my-2" />
                                    <div className="md:px-4">
                                        <p className="text-sm font-semibold">
                                            Deluxe Room with 2 Beds
                                        </p>
                                        <p className="text-sm">
                                            Check In:{' '}
                                            {new Date().toLocaleString()}
                                        </p>
                                        <p className="text-sm">
                                            Check Out:{' '}
                                            {new Date().toLocaleString()}
                                        </p>
                                        <p className="text-sm">
                                            Total Nights: 1 Night
                                        </p>
                                    </div>
                                </div>
                                <div className="border border-gray-300 px-4 py-2 md:px-0">
                                    <p className="text-sm font-semibold md:px-4">
                                        Capacity
                                    </p>
                                    <hr className="mb-2 text-gray-300 md:my-2" />

                                    <div className="md:px-4">
                                        <p className="text-sm">Max: 3</p>
                                        <p className="text-sm">Include: 2</p>
                                    </div>
                                </div>
                                <div className="border border-gray-300 px-4 py-2 md:col-span-2 md:px-0">
                                    <p className="text-sm font-semibold md:px-4">
                                        Policies
                                    </p>
                                    <hr className="mb-2 text-gray-300 md:my-2" />

                                    <div className="md:px-4">
                                        <div className="mb-3 flex items-center gap-3">
                                            <CoffeeIcon className="size-5 text-amber-500" />{' '}
                                            <span className="text-sm font-extrabold text-amber-500">
                                                Breakfast Included
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="border border-gray-300 px-4 py-2 md:px-0">
                                    <p className="text-sm font-semibold md:px-4">
                                        Price{' '}
                                        <span className="hidden md:inline">
                                            Details
                                        </span>{' '}
                                        <span className="md:hidden">Room</span>
                                    </p>
                                    <hr className="mb-2 text-gray-300 md:my-2" />

                                    <div className="md:px-4">
                                        <p className="text-sm">USD 100</p>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-6">
                                <div className="border border-b-0 border-gray-300 px-4 py-2 md:col-span-5 md:border">
                                    <p className="text-sm font-semibold">
                                        Rates Details
                                    </p>
                                    <hr className="mb-2 text-gray-300 md:hidden" />
                                    <p className="text-sm">
                                        {new Date().toLocaleString()} : USD 150
                                    </p>
                                </div>
                                <div className="border border-t-0 border-gray-300 px-4 py-2 md:border">
                                    <p className="text-sm font-semibold md:hidden">
                                        Price Details
                                    </p>
                                    <hr className="mb-2 text-gray-300 md:hidden" />

                                    <p className="text-sm">USD 150</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-6">
                                <div className="border border-gray-300 px-4 py-2 md:col-span-2">
                                    <p className="text-sm font-semibold">
                                        Deluxe Room with 2 Beds
                                    </p>
                                    <hr className="mb-2 text-gray-300 md:hidden" />
                                    <div className="flex gap-2">
                                        <Select
                                            id={'adult-guest'}
                                            name={'adult-guest'}
                                            className={
                                                '!h-8 !rounded-sm !px-2 !py-1'
                                            }
                                            options={[
                                                {
                                                    value: '1',
                                                    label: '1 Adult',
                                                },
                                                {
                                                    value: '2',
                                                    label: '2 Adult',
                                                },
                                                {
                                                    value: '3',
                                                    label: '3 Adult',
                                                },
                                            ]}
                                        />

                                        <Select
                                            id={'child-guest'}
                                            name={'child-guest'}
                                            className={
                                                '!h-8 !rounded-sm !px-2 !py-1'
                                            }
                                            options={[
                                                {
                                                    value: '1',
                                                    label: '1 Child',
                                                },
                                                {
                                                    value: '2',
                                                    label: '2 Child',
                                                },
                                                {
                                                    value: '3',
                                                    label: '3 Child',
                                                },
                                            ]}
                                        />
                                    </div>
                                </div>
                                <div className="border border-b-0 border-gray-300 px-4 py-2 md:col-span-3 md:border">
                                    <p className="text-sm font-semibold">
                                        Bed Config
                                    </p>
                                    <hr className="mb-2 text-gray-300 md:hidden" />
                                    <div>
                                        <div class="flex items-center">
                                            <Radio
                                                id={'bed-config-1'}
                                                name={'bed-config'}
                                            />
                                            <Label
                                                htmlFor={'bed-config-1'}
                                                className="ms-2 mb-0 text-sm text-gray-900"
                                            >
                                                King Bed
                                            </Label>
                                        </div>
                                        <div class="flex items-center">
                                            <Radio
                                                id={'bed-config-2'}
                                                name={'bed-config'}
                                            />
                                            <Label
                                                htmlFor={'bed-config-2'}
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
                                <div className="border border-t-0 border-gray-300 px-4 py-2 md:border">
                                    <p className="text-sm font-semibold md:hidden">
                                        Price
                                    </p>
                                    <hr className="mb-2 text-gray-300 md:hidden" />
                                    <div className="flex items-center gap-2 text-sm">
                                        <span className="mb-[2px]">+ </span>
                                        <span>USD 100</span>
                                    </div>
                                    <p className="text-sm text-amber-500">
                                        Const for 1 night
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-6 bg-blue-200">
                                <div className="col-span-3 border border-gray-300 px-4 py-2 md:col-span-5">
                                    <p className="text-sm font-semibold">
                                        Price Total
                                    </p>
                                </div>
                                <div className="col-span-3 border border-gray-300 px-4 py-2 md:col-span-1">
                                    <p className="text-sm">USD 100</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end gap-2">
                            <Button
                                className={'rounded-sm py-2'}
                                variant="primary"
                            >
                                Add More Room
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
