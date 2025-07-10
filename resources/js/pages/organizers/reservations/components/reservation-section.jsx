import TransactionStatusBadge from '@/components/transaction-status-badge'
import InformationItem from '@/pages/organizers/reservations/components/information-item'
import ReservationStatusBadge from '@/components/reservation-status-badge'
import Currency from '@/components/format/currency'
import { formatDateTime } from '@/utils/format'

export default function ReservationSection({ reservation }) {
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
                <InformationItem
                    label="Reservation Status"
                    value={
                        <ReservationStatusBadge status={reservation.status} />
                    }
                    labelColSpan={4}
                    valueColSpan={7}
                />
                <InformationItem
                    label="Transaction Status"
                    value={
                        <TransactionStatusBadge
                            status={reservation.transaction.payment_status}
                        />
                    }
                    labelColSpan={4}
                    valueColSpan={7}
                />
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
            </div>
        </div>
    )
}
