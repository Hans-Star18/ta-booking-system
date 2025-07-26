import Confirm from '@/components/alert/confirm'
import CompactGrid from '@/components/datatable/theme/compact-grid'
import Anchor from '@/components/form/anchor'
import Button from '@/components/form/button'
import OrganizerLayout from '@/layouts/organizer-layout'
import { Head, useForm } from '@inertiajs/react'
import moment from 'moment'
import { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'

export default function Index({ promotionCodes }) {
    const { delete: destroy, processing } = useForm({})

    const columns = [
        {
            name: 'No',
            selector: (row, index) => index + 1,
            width: '80px',
        },
        {
            name: 'Code',
            selector: (row) => row.code,
        },
        {
            name: 'Discount',
            selector: (row) => row.discount,
            sortable: true,
        },
        {
            name: 'Status',
            selector: (row) => row.status,
        },
        {
            name: 'Valid Until',
            selector: (row) => row.valid_until,
            sortable: true,
            sortFunction: (rowA, rowB, direction) => {
                const dateA = moment(rowA.valid_until, 'DD MMM YYYY')
                const dateB = moment(rowB.valid_until, 'DD MMM YYYY')
                return direction === 'asc'
                    ? dateA.diff(dateB)
                    : dateB.diff(dateA)
            },
        },
        {
            name: 'Actions',
            cell: (row) => (
                <div className="flex items-center gap-2">
                    <Anchor
                        variant="success"
                        href={route('organizer.promotion-codes.edit', row.id)}
                        className={'px-4 py-1'}
                    >
                        Edit
                    </Anchor>

                    <Button
                        variant="danger"
                        onClick={() => handleDelete(row.id)}
                        className={'px-4 py-1'}
                        disabled={processing}
                    >
                        Delete
                    </Button>
                </div>
            ),
        },
    ]

    const [data, setData] = useState([])

    useEffect(() => {
        setData(
            promotionCodes.map((promotionCode) => ({
                id: promotionCode.id,
                code: promotionCode.code,
                discount: `${promotionCode.discount}%`,
                status: handleStatusRender(promotionCode.is_active),
                valid_until: moment(promotionCode.valid_until).format(
                    'DD MMM YYYY'
                ),
            }))
        )
    }, [promotionCodes])

    const handleStatusRender = (status) => {
        return status ? (
            <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-green-600/20 ring-inset">
                Active
            </span>
        ) : (
            <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-red-600/20 ring-inset">
                Inactive
            </span>
        )
    }

    const handleDelete = (promotionCodeId) => {
        Confirm({
            action: 'delete',
            onConfirm: () => {
                destroy(
                    route('organizer.promotion-codes.destroy', promotionCodeId),
                    {
                        preserveScroll: true,
                    }
                )
            },
        })
    }

    return (
        <>
            <Head title="Organizer Promotion Code Management" />

            <OrganizerLayout>
                <div className="rounded-2xl border border-gray-200 bg-white p-4 md:p-6">
                    <div className="mb-4 flex items-center justify-between">
                        <h1 className="text-2xl font-bold">
                            Promotion Code List
                        </h1>
                        <Anchor
                            variant="primary"
                            href={route('organizer.promotion-codes.create')}
                        >
                            Add New Promotion Code
                        </Anchor>
                    </div>

                    <div className="">
                        <DataTable
                            customStyles={CompactGrid}
                            columns={columns}
                            data={data}
                            highlightOnHover
                            pointerOnHover
                            pagination
                        />
                    </div>
                </div>
            </OrganizerLayout>
        </>
    )
}
