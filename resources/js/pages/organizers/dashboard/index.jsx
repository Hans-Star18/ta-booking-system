import OrganizerLayout from '@/layouts/organizer-layout'
import { Head } from '@inertiajs/react'
import DataTable, { defaultThemes } from 'react-data-table-component'
import CompactGrid from '@/components/datatable/theme/compact-grid'
import { useEffect, useState } from 'react'
import Anchor from '@/components/form/anchor'
import Button from '@/components/form/button'
import Currency from '@/components/format/currency'
import { formatDateTime } from '@/utils/format'
import ReservationStatusBadge from '@/components/reservation-status-badge'
import TransactionStatusBadge from '@/components/transaction-status-badge'

const columns = [
    {
        name: 'No',
        selector: (row, index) => index + 1,
        width: '60px',
    },
    {
        name: 'Res. Number',
        selector: (row) => row.reservation_number,
    },
    {
        name: 'Res. Date',
        selector: (row) => formatDateTime(row.reservation_date),
        width: '150px',
    },
    {
        name: 'Res. Status',
        selector: (row) => (
            <ReservationStatusBadge status={row.reservation_status} />
        ),
        width: '150px',
    },
    {
        name: 'TRX Status',
        selector: (row) => (
            <TransactionStatusBadge status={row.transaction_status} />
        ),
        width: '150px',
    },
    {
        name: 'DP.',
        selector: (row) => <Currency value={row.pay_now} />,
        width: '120px',
    },
    {
        name: 'Total',
        selector: (row) => <Currency value={row.total} />,
        width: '120px',
    },
    {
        name: 'Actions',
        cell: (row) => (
            <div className="flex flex-col items-end gap-2 md:flex-row">
                <Anchor
                    variant="primary"
                    href={route('organizer.reservations.show', row.id)}
                    className={'px-4 py-1'}
                >
                    Show
                </Anchor>
                <Anchor
                    variant="success"
                    // href={route('organizer.reservations.show', row.id)}
                    className={'px-4 py-1'}
                >
                    Edit
                </Anchor>
            </div>
        ),
        width: '170px',
    },
]

export default function Index({ reservations }) {
    const [data, setData] = useState([])

    useEffect(() => {
        setData(
            reservations.map((reservation) => ({
                id: reservation.id,
                reservation_number: reservation.reservation_number,
                reservation_status: reservation.status,
                transaction_status: reservation.transaction.payment_status,
                pay_now: reservation.transaction.pay_now,
                total: reservation.transaction.total_price,
                reservation_date: reservation.created_at,
            }))
        )
    }, [reservations])

    return (
        <>
            <Head title="Organizer Dashboard" />

            <OrganizerLayout>
                <div className="min-h-screen rounded-2xl border border-gray-200 bg-white p-4 md:p-6">
                    <div className="mb-4 flex items-center justify-between">
                        <h1 className="text-2xl font-bold">Dashboard</h1>
                    </div>

                    <div className="max-w-[1200px] overflow-x-auto">
                        <DataTable
                            customStyles={CompactGrid}
                            columns={columns}
                            data={data}
                            highlightOnHover
                            pointerOnHover
                            pagination
                            responsive
                        />
                    </div>
                </div>
            </OrganizerLayout>
        </>
    )
}
