import Button from '@/components/form/button'
import Select from '@/components/form/select'
import { ArrowPathIcon } from '@heroicons/react/24/outline'
import { router } from '@inertiajs/react'
import { useState } from 'react'

const handleStatusChange = (
    reservationStatus = null,
    transactionStatus = null
) => {
    router.visit(
        `?reservation_status=${reservationStatus}&transaction_status=${transactionStatus}`
    )
}

export function FilterSection() {
    const searchParams = new URLSearchParams(window.location.search)
    const [reservationStatus, setReservationStatus] = useState(
        searchParams.get('reservation_status') ?? ''
    )
    const [transactionStatus, setTransactionStatus] = useState(
        searchParams.get('transaction_status') ?? ''
    )

    return (
        <div className="flex gap-2">
            <Select
                id="reservation-status"
                name="reservation_status"
                options={[
                    { value: 'pending', label: 'Pending' },
                    { value: 'confirmed', label: 'Confirmed' },
                    { value: 'cancelled', label: 'Cancelled' },
                ]}
                defaultValue={reservationStatus}
                onChange={(e) => {
                    setReservationStatus(e.target.value)
                    handleStatusChange(e.target.value, transactionStatus)
                }}
                placeholder="Reservation Status"
            ></Select>
            <Select
                id="transaction-status"
                name="transaction_status"
                options={[
                    { value: 'pending', label: 'Pending' },
                    { value: 'success', label: 'Success' },
                    { value: 'capture', label: 'Capture' },
                    {
                        value: 'settlement',
                        label: 'Settlement',
                    },
                    { value: 'expire', label: 'Expire' },
                    { value: 'refund', label: 'Refund' },
                    { value: 'failed', label: 'Failed' },
                ]}
                defaultValue={transactionStatus}
                onChange={(e) => {
                    setTransactionStatus(e.target.value)
                    handleStatusChange(reservationStatus, e.target.value)
                }}
                placeholder="Transaction Status"
            ></Select>
            {(reservationStatus || transactionStatus) && (
                <Button
                    variant="outline"
                    className={`px-2 py-2`}
                    onClick={() => {
                        setReservationStatus('')
                        setTransactionStatus('')
                        handleStatusChange('', '')
                    }}
                >
                    <ArrowPathIcon className="size-5" />
                </Button>
            )}
        </div>
    )
}
