import Confirm from '@/components/alert/confirm'
import CompactGrid from '@/components/datatable/theme/compact-grid'
import Anchor from '@/components/form/anchor'
import Button from '@/components/form/button'
import AdminLayout from '@/layouts/admin-layout'
import { Head, router, useForm } from '@inertiajs/react'
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'
import moment from 'moment'
import { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'

export default function Index({ beds }) {
    const { delete: destroy, processing } = useForm({})

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
            width: '150px',
        },
        {
            name: 'Capacity',
            selector: (row) => row.capacity,
            sortable: true,
            width: '130px',
        },
        {
            name: 'Description',
            selector: (row) => row.description,
            wrap: true,
            sortable: true,
        },
        {
            name: 'Created At',
            selector: (row) => row.created_at,
            sortable: true,
            width: '150px',
        },
        {
            name: 'Actions',
            cell: (row) => (
                <div className="flex items-center gap-2">
                    <Anchor
                        variant="success"
                        href={route('admin.beds.edit', row.id)}
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
            width: '120px',
        },
    ]

    const [data, setData] = useState([])

    useEffect(() => {
        if (beds && Array.isArray(beds)) {
            setData(
                beds.map((bed) => ({
                    id: bed.id,
                    name: bed.name,
                    capacity: bed.capacity,
                    description: bed.description,
                    created_at: moment(bed.created_at).format('DD MMM YYYY'),
                }))
            )
        } else {
            setData([])
        }
    }, [beds])

    const handleDelete = (bedId) => {
        Confirm({
            action: 'delete',
            onConfirm: () => {
                destroy(route('admin.beds.destroy', bedId), {
                    preserveScroll: true,
                    onSuccess: () => {
                        router.reload({
                            only: ['beds'],
                        })
                    },
                })
            },
        })
    }

    return (
        <>
            <Head title="Admin Bed Management" />

            <AdminLayout>
                <div className="rounded-2xl border border-gray-200 bg-white p-4 md:p-6">
                    <div className="mb-4 flex items-center justify-between">
                        <h1 className="text-2xl font-bold">Bed List</h1>
                        <Anchor
                            variant="primary"
                            href={route('admin.beds.create')}
                        >
                            Add New Bed
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
                            noDataComponent="No beds found."
                        />
                    </div>
                </div>
            </AdminLayout>
        </>
    )
}
