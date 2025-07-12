import Anchor from '@/components/form/anchor'
import OrganizerLayout from '@/layouts/organizer-layout'
import { ArrowLeftIcon, PencilSquareIcon } from '@heroicons/react/24/outline'
import { Head } from '@inertiajs/react'
import CustomerSection from '@/pages/organizers/reservations/components/customer-section'
import ReservationSection from '@/pages/organizers/reservations/components/reservation-section'
import ReservationDetail from '@/pages/organizers/reservations/components/reservation-detail'
import Currency from '@/components/format/currency'
import { useState } from 'react'

export default function Show({ reservation }) {
    const [transaction, setTransaction] = useState(reservation?.transaction)

    return (
        <>
            <Head title="Reservation Details" />

            <OrganizerLayout>
                <div className="rounded-2xl border border-gray-200 bg-white p-4 md:p-6">
                    <div className="mb-4 flex w-full items-center justify-between">
                        <h1 className="text-2xl font-bold">
                            Reservation Details
                        </h1>

                        <div className="flex gap-2">
                            <Anchor
                                variant="secondary"
                                href={route('organizer.dashboard')}
                                className="flex items-center gap-1"
                            >
                                <ArrowLeftIcon className="size-4" />
                                Back
                            </Anchor>
                            <Anchor
                                variant="success"
                                href={route(
                                    'organizer.reservations.edit',
                                    reservation
                                )}
                                className="flex items-center gap-1"
                            >
                                <PencilSquareIcon className="size-4" />
                                Edit
                            </Anchor>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <CustomerSection reservation={reservation} />
                        <ReservationSection reservation={reservation} />
                        <ReservationDetail reservation={reservation} />

                        <div className="col-span-2">
                            <div className="grid grid-cols-2 gap-8 text-sm">
                                <div className="flex w-full flex-col rounded-md border border-gray-400 bg-gray-100 p-2">
                                    <span className="mb-2 font-semibold">
                                        Comment/ Request:{' '}
                                    </span>
                                    <hr className="mb-2 text-gray-400" />
                                    <span className="text-gray-600">
                                        {reservation?.reservation_customer
                                            ?.request || '-'}
                                    </span>
                                </div>
                                <div className="flex w-full flex-col">
                                    <span className="mb-4 grid grid-cols-6 border-b border-gray-200 pb-2">
                                        <span className="col-span-4">
                                            Subtotal
                                        </span>
                                        <Currency
                                            value={transaction?.subtotal || 0}
                                        />
                                    </span>
                                    <span className="mb-4 grid grid-cols-6 border-b border-gray-200 pb-2">
                                        <span className="col-span-4">
                                            Tax (
                                            {reservation?.hotel?.setting
                                                ?.tax_percentage || 0}
                                            %)
                                        </span>
                                        <Currency
                                            value={transaction?.tax_amount || 0}
                                        />
                                    </span>
                                    <span className="mb-4 grid grid-cols-6 border-b border-gray-200 pb-2">
                                        <span className="col-span-4">
                                            Discount (
                                            {transaction?.promotion
                                                ? `${transaction?.promotion.code} (${transaction?.promotion?.discount}%)`
                                                : transaction.promotion_code}
                                            )
                                        </span>
                                        <Currency
                                            value={transaction?.discount || 0}
                                        />
                                    </span>
                                    <span className="mb-4 grid grid-cols-6 border-b border-gray-200 pb-2 font-bold">
                                        <span className="col-span-4">
                                            Total
                                        </span>
                                        <Currency
                                            value={
                                                transaction?.total_price || 0
                                            }
                                        />
                                    </span>
                                    <span className="mb-4 grid grid-cols-6 border-b border-gray-200 pb-2">
                                        <span className="col-span-4">
                                            Deposit Amount (
                                            {reservation.hotel.setting
                                                .dp_percentage || '-'}
                                            %)
                                        </span>
                                        <Currency
                                            value={transaction?.pay_now || 0}
                                        />
                                    </span>
                                    <span className="mb-4 grid grid-cols-6 border-b border-gray-200 pb-2">
                                        <span className="col-span-4">
                                            Remaining Payment
                                        </span>
                                        <Currency
                                            value={
                                                transaction?.balance_to_be_paid ||
                                                0
                                            }
                                        />
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </OrganizerLayout>
        </>
    )
}
