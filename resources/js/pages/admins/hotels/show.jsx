import Input from '@/components/form/input'
import Label from '@/components/form/label'
import AdminLayout from '@/layouts/admin-layout'
import { Head } from '@inertiajs/react'
import HTMLReactParser from 'html-react-parser'
import Badge from '@/components/form/badge'
import { useState } from 'react'
import Anchor from '@/components/form/anchor'

export default function Show({ hotel }) {
    const [data, setData] = useState({
        name: hotel.name,
        address: hotel.address,
        phone: hotel.phone,
        mobile: hotel.mobile,
        email: hotel.email,
        website: hotel.website,
        organizer: hotel.user?.name ?? 'N/A',
        is_active: hotel.is_active,
        term_and_condition: hotel.term_and_condition,
    })

    const isActiveRender = (isActive) => {
        return isActive ? (
            <Badge variant="success">Active</Badge>
        ) : (
            <Badge variant="danger">Inactive</Badge>
        )
    }

    return (
        <>
            <Head title="Admin Hotel Detail" />

            <AdminLayout>
                <div className="rounded-2xl border border-gray-200 bg-white p-4 md:p-6">
                    <div className="mb-4 flex items-center justify-between">
                        <h1 className="text-2xl font-bold">Hotel Detail</h1>

                        <div className="flex gap-2">
                            <Anchor
                                variant="success"
                                href={route('admin.companies.edit', hotel.id)}
                            >
                                Edit
                            </Anchor>
                            <Anchor
                                variant="secondary"
                                href={route('admin.companies.index')}
                            >
                                Back
                            </Anchor>
                        </div>
                    </div>

                    <form className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div className="col-span-2 mb-2 md:col-span-1">
                            <Label htmlFor="name" required={true}>
                                Name
                            </Label>
                            <Input
                                id="name"
                                name="name"
                                placeholder="Enter Hotel Name"
                                defaultValue={data.name}
                                disabled={true}
                            />
                        </div>
                        <div className="col-span-2 mb-2 md:col-span-1">
                            <Label htmlFor="address" required={true}>
                                Address
                            </Label>
                            <Input
                                id="address"
                                name="address"
                                placeholder="Enter Hotel Address"
                                defaultValue={data.address}
                                disabled={true}
                            />
                        </div>
                        <div className="col-span-2 mb-2 md:col-span-1">
                            <Label htmlFor="phone" required={true}>
                                Phone
                            </Label>
                            <Input
                                id="phone"
                                name="phone"
                                placeholder="Enter Hotel Phone"
                                defaultValue={data.phone}
                                disabled={true}
                            />
                        </div>
                        <div className="col-span-2 mb-2 md:col-span-1">
                            <Label htmlFor="mobile" required={true}>
                                Mobile
                            </Label>
                            <Input
                                id="mobile"
                                name="mobile"
                                placeholder="Enter Hotel Mobile Phone"
                                defaultValue={data.mobile}
                                disabled={true}
                            />
                        </div>
                        <div className="col-span-2 mb-2 md:col-span-1">
                            <Label htmlFor="email" required={true}>
                                Email
                            </Label>
                            <Input
                                id="email"
                                name="email"
                                placeholder="Enter Hotel Email"
                                defaultValue={data.email}
                                disabled={true}
                            />
                        </div>
                        <div className="col-span-2 mb-2 md:col-span-1">
                            <Label htmlFor="website" required={true}>
                                Website
                            </Label>
                            <Input
                                id="website"
                                name="website"
                                placeholder="Enter Hotel Website"
                                defaultValue={data.website}
                                disabled={true}
                            />
                        </div>
                        <div className="col-span-2 mb-2 md:col-span-1">
                            <Label htmlFor="user_id" required={true}>
                                Hotel Organizer
                            </Label>
                            <div className="text-sm font-medium">
                                {data.organizer}
                            </div>
                        </div>
                        <div className="col-span-2 mb-2 md:col-span-1">
                            <Label htmlFor="is_active" required={true}>
                                Is Active
                            </Label>
                            <div>{isActiveRender(data.is_active)}</div>
                        </div>
                        <div className="col-span-2 mb-2 md:col-span-2">
                            <Label htmlFor="term_and_condition" required={true}>
                                Terms and Conditions
                            </Label>
                            <div className="text-sm font-medium">
                                {HTMLReactParser(data.term_and_condition || '')}
                            </div>
                        </div>
                    </form>
                </div>
            </AdminLayout>
        </>
    )
}
