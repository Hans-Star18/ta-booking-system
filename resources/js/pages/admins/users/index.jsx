import Confirm from '@/components/alert/confirm'
import CompactGrid from '@/components/datatable/theme/compact-grid'
import Anchor from '@/components/form/anchor'
import Button from '@/components/form/button'
import Badge from '@/components/form/badge'
import AdminLayout from '@/layouts/admin-layout'
import { Head, Link, router, useForm } from '@inertiajs/react'
import {
    ArrowTopRightOnSquareIcon,
    EyeIcon,
    PencilSquareIcon,
    TrashIcon,
} from '@heroicons/react/24/outline'
import moment from 'moment'
import { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'

export default function Index({ users }) {
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
            name: 'Email',
            selector: (row) => row.email,
            sortable: true,
        },
        {
            name: 'Role',
            selector: (row) => renderRole(row.role),
            sortable: true,
        },
        {
            name: 'Has Hotel',
            selector: (row) => renderHasHotel(row.hotel),
            sortable: true,
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
                        href={route('admin.users.show', row.id)}
                        className={'px-2 py-1'}
                    >
                        <EyeIcon className="size-5" />
                    </Anchor>
                    <Anchor
                        variant="success"
                        href={route('admin.users.edit', row.id)}
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
            users.map((user) => ({
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role.name,
                hotel: user.hotel,
                created_at: moment(user.created_at).format('DD MMM YYYY'),
            }))
        )
    }, [users])

    const renderRole = (role) => {
        switch (role) {
            case 'Admin':
                return <Badge variant="danger">{role}</Badge>
            case 'Hotel Organizer':
                return <Badge variant="warning">{role}</Badge>
            default:
                return <Badge variant="secondary">{role}</Badge>
        }
    }

    const renderHasHotel = (hotel) => {
        return hotel ? (
            <div className="flex items-center gap-2">
                <Badge variant="success">Yes</Badge>
                <Link href={route('admin.companies.show', hotel.id)}>
                    <ArrowTopRightOnSquareIcon className="size-5" />
                </Link>
            </div>
        ) : (
            <Badge variant="danger">No</Badge>
        )
    }

    const handleDelete = (userId) => {
        Confirm({
            action: 'delete',
            onConfirm: () => {
                destroy(route('admin.users.destroy', userId), {
                    preserveScroll: true,
                    onSuccess: () => {
                        router.reload({
                            only: ['users'],
                        })
                    },
                })
            },
        })
    }

    return (
        <>
            <Head title="Admin User Management" />

            <AdminLayout>
                <div className="rounded-2xl border border-gray-200 bg-white p-4 md:p-6">
                    <div className="mb-4 flex items-center justify-between">
                        <h1 className="text-2xl font-bold">User List</h1>
                        <Anchor
                            variant="primary"
                            href={route('admin.users.create')}
                        >
                            Add New User
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
