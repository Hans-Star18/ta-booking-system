import Anchor from '@/components/form/anchor'
import Badge from '@/components/form/badge'
import Input from '@/components/form/input'
import Label from '@/components/form/label'
import AdminLayout from '@/layouts/admin-layout'
import { Head } from '@inertiajs/react'

export default function Show({ user }) {
    const renderHasHotel = (hotel) => {
        return hotel ? (
            <Badge variant="success">Yes</Badge>
        ) : (
            <Badge variant="danger">No</Badge>
        )
    }

    return (
        <>
            <Head title="Admin User Detail" />

            <AdminLayout>
                <div className="rounded-2xl border border-gray-200 bg-white p-4 md:p-6">
                    <div className="mb-4 flex items-center justify-between">
                        <h1 className="text-2xl font-bold">User Detail</h1>

                        <div className="flex gap-2">
                            <Anchor
                                variant="success"
                                href={route('admin.users.edit', user.id)}
                            >
                                Edit
                            </Anchor>
                            <Anchor
                                variant="secondary"
                                href={route('admin.users.index')}
                            >
                                Back
                            </Anchor>
                        </div>
                    </div>

                    <form
                        className="grid grid-cols-1 gap-6 md:grid-cols-2"
                        encType="multipart/form-data"
                        method="POST"
                    >
                        <div className="col-span-2 mb-2 md:col-span-1">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                name="name"
                                placeholder="Enter Name"
                                defaultValue={user.name}
                                disabled={true}
                            />
                        </div>
                        <div className="col-span-2 mb-2 md:col-span-1">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                placeholder="Enter Email"
                                defaultValue={user.email}
                                disabled={true}
                            />
                        </div>
                        <div className="col-span-2 mb-2 md:col-span-1">
                            <Label htmlFor="role_id">Role</Label>
                            <Input
                                id="role_id"
                                name="role_id"
                                placeholder="Enter Role"
                                defaultValue={user.role.name}
                                disabled={true}
                            />
                        </div>
                        <div className="col-span-2 mb-2 md:col-span-1">
                            <Label htmlFor="has_hotel">Has Hotel</Label>
                            {renderHasHotel(user.hotel)}
                        </div>
                    </form>
                </div>
            </AdminLayout>
        </>
    )
}
