import TransactionStatusBadge from '@/components/transaction-status-badge'
import InformationItem from '@/pages/organizers/reservations/components/information-item'
import ReservationStatusBadge from '@/components/reservation-status-badge'
import Currency from '@/components/format/currency'
import { formatDateTime } from '@/utils/format'
import Select from '@/components/form/select'
import { useForm } from '@inertiajs/react'
import ValidationFeedback from '@/components/form/validation-feedback'
import Anchor from '@/components/form/anchor'
import Button from '@/components/form/button'

export default function ReservationSection({ reservation, method = 'show' }) {
    const { data, setData, errors, patch, processing } = useForm({
        status: reservation.status,
        payment_status: reservation.transaction.payment_status,
    })

    const reservationStatusOptions = [
        { value: 'pending', label: 'Pending' },
        { value: 'confirmed', label: 'Confirmed' },
        { value: 'cancelled', label: 'Cancelled' },
    ]

    const transactionStatusOptions = [
        { value: 'pending', label: 'Pending' },
        { value: 'success', label: 'Success' },
        { value: 'capture', label: 'Capture' },
        { value: 'settlement', label: 'Settlement' },
        { value: 'expire', label: 'Expire' },
        { value: 'refund', label: 'Refund' },
        { value: 'failed', label: 'Failed' },
    ]

    const handleUpdate = () => {
        patch(route('organizer.reservations.update', reservation.id))
    }

    return (
        <div className="col-span-1">
            <h2 className="mb-3 text-xl">Reservation Information</h2>
            <div className="space-y-2 text-base font-light text-gray-600">
                <InformationItem
                    label="Reservation Number"
                    value={reservation.reservation_number}
                    labelColSpan={4}
                    valueColSpan={7}
                />
                {method === 'show' ? (
                    <>
                        <InformationItem
                            label="Reservation Status"
                            value={
                                <ReservationStatusBadge
                                    status={reservation.status}
                                />
                            }
                            labelColSpan={4}
                            valueColSpan={7}
                        />
                        <InformationItem
                            label="Transaction Status"
                            value={
                                <TransactionStatusBadge
                                    status={
                                        reservation.transaction.payment_status
                                    }
                                />
                            }
                            labelColSpan={4}
                            valueColSpan={7}
                        />
                    </>
                ) : (
                    <form
                        method="POST"
                        action={route(
                            'organizer.reservations.update',
                            reservation.id
                        )}
                        className="space-y-2"
                    >
                        <div className="grid grid-cols-12 gap-2">
                            <p className="col-span-4">Reservation Status</p>
                            <span className="col-span-1">:</span>
                            <span className="col-span-7">
                                <Select
                                    id={'status'}
                                    name={'status'}
                                    defaultValue={data.status}
                                    options={reservationStatusOptions}
                                    className={'h-6 rounded-sm py-0'}
                                    onChange={(e) =>
                                        setData('status', e.target.value)
                                    }
                                />
                                <ValidationFeedback message={errors.status} />
                            </span>
                        </div>

                        <div className="grid grid-cols-12 gap-2">
                            <p className="col-span-4">Transaction Status</p>
                            <span className="col-span-1">:</span>
                            <span className="col-span-7">
                                <Select
                                    id={'payment_status'}
                                    name={'payment_status'}
                                    defaultValue={data.payment_status}
                                    options={transactionStatusOptions}
                                    className={'h-6 rounded-sm py-0'}
                                    onChange={(e) =>
                                        setData(
                                            'payment_status',
                                            e.target.value
                                        )
                                    }
                                />
                                <ValidationFeedback
                                    message={errors.payment_status}
                                />
                            </span>
                        </div>
                    </form>
                )}
                <InformationItem
                    label="Deposit Amount"
                    value={<Currency value={reservation.transaction.pay_now} />}
                    labelColSpan={4}
                    valueColSpan={7}
                />
                <InformationItem
                    label="Reservation Date"
                    value={formatDateTime(reservation.created_at)}
                    labelColSpan={4}
                    valueColSpan={7}
                />

                {method === 'edit' && (
                    <div className="flex justify-end gap-2">
                        <Anchor
                            className={'rounded-sm py-2'}
                            variant="danger"
                            href={route(
                                'organizer.reservations.show',
                                reservation.id
                            )}
                        >
                            Back
                        </Anchor>

                        <Button
                            className={'rounded-sm py-2'}
                            variant="success"
                            disabled={processing}
                            onClick={handleUpdate}
                        >
                            Update
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}
