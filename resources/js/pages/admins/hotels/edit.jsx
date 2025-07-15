import Anchor from '@/components/form/anchor'
import Button from '@/components/form/button'
import Input from '@/components/form/input'
import Label from '@/components/form/label'
import Select from '@/components/form/select'
import ValidationFeedback from '@/components/form/validation-feedback'
import AdminLayout from '@/layouts/admin-layout'
import { ArrowPathIcon } from '@heroicons/react/24/outline'
import { Head, useForm } from '@inertiajs/react'
import TextEditor from '@/components/form/text-editor'

export default function Edit({ hotel, hotelOrganizerOptions }) {
    const { data, setData, put, processing, errors } = useForm({
        name: hotel.name,
        address: hotel.address,
        phone: hotel.phone,
        mobile: hotel.mobile,
        email: hotel.email,
        website: hotel.website,
        user_id: hotel.user_id,
        is_active: hotel.is_active,
        term_and_condition: hotel.term_and_condition,
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        put(route('admin.companies.update', hotel.id), {
            preserveScroll: true,
        })
    }

    return (
        <>
            <Head title="Admin Hotel Detail" />

            <AdminLayout>
                <div className="rounded-2xl border border-gray-200 bg-white p-4 md:p-6">
                    <div className="mb-4 flex items-center justify-between">
                        <h1 className="text-2xl font-bold">Hotel Detail</h1>
                    </div>

                    <form
                        className="grid grid-cols-1 gap-6 md:grid-cols-2"
                        method="POST"
                    >
                        <div className="col-span-2 mb-2 md:col-span-1">
                            <Label htmlFor="name" required={true}>
                                Name
                            </Label>
                            <Input
                                id="name"
                                name="name"
                                placeholder="Enter Hotel Name"
                                defaultValue={data.name}
                                onChange={(e) =>
                                    setData('name', e.target.value)
                                }
                                className={errors.name && 'ring ring-red-500'}
                            />
                            <ValidationFeedback message={errors.name} />
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
                                onChange={(e) =>
                                    setData('address', e.target.value)
                                }
                                className={
                                    errors.address && 'ring ring-red-500'
                                }
                            />
                            <ValidationFeedback message={errors.address} />
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
                                onChange={(e) =>
                                    setData('phone', e.target.value)
                                }
                                className={errors.phone && 'ring ring-red-500'}
                            />
                            <ValidationFeedback message={errors.phone} />
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
                                onChange={(e) =>
                                    setData('mobile', e.target.value)
                                }
                                className={errors.mobile && 'ring ring-red-500'}
                            />
                            <ValidationFeedback message={errors.mobile} />
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
                                onChange={(e) =>
                                    setData('email', e.target.value)
                                }
                                className={errors.email && 'ring ring-red-500'}
                            />
                            <ValidationFeedback message={errors.email} />
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
                                onChange={(e) =>
                                    setData('website', e.target.value)
                                }
                                className={
                                    errors.website && 'ring ring-red-500'
                                }
                            />
                            <ValidationFeedback message={errors.website} />
                        </div>
                        <div className="col-span-2 mb-2 md:col-span-1">
                            <Label htmlFor="user_id" required={true}>
                                Hotel Organizer
                            </Label>
                            <Select
                                id="user_id"
                                name="user_id"
                                options={hotelOrganizerOptions}
                                defaultValue={data.user_id}
                                onChange={(e) =>
                                    setData('user_id', e.target.value)
                                }
                                className={
                                    errors.user_id && 'ring ring-red-500'
                                }
                            />
                            <ValidationFeedback message={errors.user_id} />
                        </div>
                        <div className="col-span-2 mb-2 md:col-span-1">
                            <Label htmlFor="is_active" required={true}>
                                Is Active
                            </Label>
                            <Select
                                id="is_active"
                                name="is_active"
                                options={[
                                    { label: 'Active', value: true },
                                    { label: 'Inactive', value: false },
                                ]}
                                defaultValue={data.is_active}
                                onChange={(e) =>
                                    setData('is_active', e.target.value)
                                }
                                className={
                                    errors.is_active && 'ring ring-red-500'
                                }
                            />
                            <ValidationFeedback message={errors.is_active} />
                        </div>
                        <div className="col-span-2 mb-2 md:col-span-2">
                            <Label htmlFor="term_and_condition" required={true}>
                                Terms and Conditions
                            </Label>
                            <TextEditor
                                defaultValue={data.term_and_condition}
                                onChange={(value) =>
                                    setData('term_and_condition', value)
                                }
                                className={
                                    errors.term_and_condition &&
                                    'ring ring-red-500'
                                }
                            />
                            <ValidationFeedback
                                message={errors.term_and_condition}
                            />
                        </div>
                        <div className="col-span-2 flex items-center justify-end gap-2">
                            <Anchor
                                variant="secondary"
                                href={route('admin.companies.index')}
                            >
                                Back
                            </Anchor>
                            <Button
                                variant="success"
                                onClick={handleSubmit}
                                className={'flex items-center gap-2'}
                                disabled={processing}
                            >
                                {processing && (
                                    <ArrowPathIcon className="size-5 animate-spin" />
                                )}
                                Update Hotel
                            </Button>
                        </div>
                    </form>
                </div>
            </AdminLayout>
        </>
    )
}
