import OrganizerLayout from '@/layouts/organizer-layout'
import { Head } from '@inertiajs/react'
import DataTable, { defaultThemes } from 'react-data-table-component'
import CompactGrid from '@/components/datatable/theme/compact-grid'
import { useEffect, useState } from 'react'
import Anchor from '@/components/form/anchor'
import Button from '@/components/form/button'
import Currency from '@/components/format/currency'
import { formatDateTime } from '@/utils/format'

export default function Index({ reservations }) {
    console.log(reservations)

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
            selector: (row) =>
                handleReservationStatusRender(row.reservation_status),
            width: '150px',
        },
        {
            name: 'TRX Status',
            selector: (row) =>
                handleTransactionStatusRender(row.transaction_status),
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
                        // href={route('organizer.reservations.show', row.id)}
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

    const handleReservationStatusRender = (status) => {
        switch (status) {
            case 'pending':
                return (
                    <span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-700 ring-1 ring-yellow-600/20 ring-inset">
                        {status}
                    </span>
                )
            case 'confirmed':
                return (
                    <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-green-600/20 ring-inset">
                        {status}
                    </span>
                )
            case 'canceled':
                return (
                    <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-red-600/20 ring-inset">
                        {status}
                    </span>
                )
            default:
                return (
                    <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-700 ring-1 ring-gray-600/20 ring-inset">
                        {status}
                    </span>
                )
        }
    }

    const handleTransactionStatusRender = (status) => {
        switch (status) {
            case 'pending':
                return (
                    <span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-700 ring-1 ring-yellow-600/20 ring-inset">
                        {status}
                    </span>
                )
            case 'success':
                return (
                    <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-green-600/20 ring-inset">
                        {status}
                    </span>
                )
            case 'capture':
                return (
                    <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-green-600/20 ring-inset">
                        {status}
                    </span>
                )
            case 'settlement':
                return (
                    <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-green-600/20 ring-inset">
                        {status}
                    </span>
                )
            case 'expire':
                return (
                    <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-red-600/20 ring-inset">
                        {status}
                    </span>
                )
            case 'failed':
                return (
                    <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-red-600/20 ring-inset">
                        {status}
                    </span>
                )
            default:
                return (
                    <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-700 ring-1 ring-gray-600/20 ring-inset">
                        {status}
                    </span>
                )
        }
    }

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
