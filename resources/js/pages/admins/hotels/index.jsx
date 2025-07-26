import Confirm from '@/components/alert/confirm'
import CompactGrid from '@/components/datatable/theme/compact-grid'
import Anchor from '@/components/form/anchor'
import Button from '@/components/form/button'
import AdminLayout from '@/layouts/admin-layout'
import {
    EyeIcon,
    PencilSquareIcon,
    TrashIcon,
} from '@heroicons/react/24/outline'
import { Head, router, useForm } from '@inertiajs/react'
import moment from 'moment'
import { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'

export default function Index({ hotels }) {
    const { delete: destroy, processing, errors } = useForm({})

    const columns = [
        {
            name: 'No',
            selector: (row, index) => index + 1,
            width: '60px',
        },
        {
            name: 'Name',
            selector: (row) => row.name,
            sortable: true,
        },
        {
            name: 'Mobile',
            selector: (row) => row.mobile,
        },
        {
            name: 'Email',
            selector: (row) => row.email,
        },
        {
            name: 'Website',
            selector: (row) => row.website,
        },
        {
            name: 'Is Active',
            cell: (row) => isActiveRender(row.is_active),
        },
        {
            name: 'Created At',
            selector: (row) => row.created_at,
            sortable: true,
        },
        {
            name: 'Actions',
            cell: (row) => (
                <div className="flex items-center gap-2">
                    <Anchor
                        variant="primary"
                        href={route('admin.companies.show', row.id)}
                        className={'px-2 py-1'}
                    >
                        <EyeIcon className="size-5" />
                    </Anchor>
                    <Anchor
                        variant="success"
                        href={route('admin.companies.edit', row.id)}
                        className={'px-2 py-1'}
                    >
                        <PencilSquareIcon className="size-5" />
                    </Anchor>
                    <Button
                        variant="danger"
                        onClick={() => handleDelete(row.id)}
                        className={'px-2 py-1'}
                        disabled={processing}
                    >
                        <TrashIcon className="size-5" />
                    </Button>
                </div>
            ),
            width: '150px',
        },
    ]

    const [data, setData] = useState([])

    useEffect(() => {
        setData(
            hotels.map((hotel) => ({
                id: hotel.id,
                uuid: hotel.uuid,
                name: hotel.name,
                mobile: hotel.mobile,
                email: hotel.email,
                website: hotel.website,
                is_active: hotel.is_active,
                created_at: moment(hotel.created_at).format('DD MMM YYYY'),
            }))
        )
    }, [hotels])

    const isActiveRender = (isActive) => {
        return isActive ? (
            <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-green-600/20 ring-inset">
                Active
            </span>
        ) : (
            <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-red-600/20 ring-inset">
                Inactive
            </span>
        )
    }

    const handleDelete = (hotelId) => {
        Confirm({
            action: 'delete',
            onConfirm: () => {
                destroy(route('admin.companies.destroy', hotelId), {
                    preserveScroll: true,
                    onSuccess: () => {
                        router.reload({
                            only: ['hotels'],
                        })
                    },
                })
            },
        })
    }

    return (
        <>
            <Head title="Admin Hotels Management" />

            <AdminLayout>
                <div className="rounded-2xl border border-gray-200 bg-white p-4 md:p-6">
                    <div className="mb-4 flex items-center justify-between">
                        <h1 className="text-2xl font-bold">Hotels List</h1>
                        <Anchor
                            variant="primary"
                            href={route('admin.companies.create')}
                        >
                            Add New Hotel
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
            </AdminLayout>
        </>
    )
}
