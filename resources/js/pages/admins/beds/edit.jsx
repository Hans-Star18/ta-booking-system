import Anchor from '@/components/form/anchor'
import Button from '@/components/form/button'
import Input from '@/components/form/input'
import Label from '@/components/form/label'
import { Textarea } from '@/components/form/textarea'
import ValidationFeedback from '@/components/form/validation-feedback'
import AdminLayout from '@/layouts/admin-layout'
import { ArrowPathIcon } from '@heroicons/react/24/outline'
import { Head, useForm } from '@inertiajs/react'

export default function Edit({ bed }) {
    const { data, setData, put, processing, errors } = useForm({
        name: bed.name,
        capacity: bed.capacity,
        description: bed.description,
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        put(route('admin.beds.update', bed.id), {
            preserveScroll: true,
        })
    }

    return (
        <>
            <Head title="Admin Bed Detail" />

            <AdminLayout>
                <div className="rounded-2xl border border-gray-200 bg-white p-4 md:p-6">
                    <div className="mb-4 flex items-center justify-between">
                        <h1 className="text-2xl font-bold">Bed Detail</h1>
                    </div>

                    <form
                        className="grid grid-cols-1 gap-6 md:grid-cols-2"
                        encType="multipart/form-data"
                        method="POST"
                    >
                        <div className="col-span-2 mb-2 md:col-span-1">
                            <Label htmlFor="name" required={true}>
                                Bed Name
                            </Label>
                            <Input
                                id="name"
                                name="name"
                                placeholder="Enter Bed Name"
                                defaultValue={data.name}
                                onChange={(e) =>
                                    setData('name', e.target.value)
                                }
                            />
                            <ValidationFeedback message={errors.name} />
                        </div>
                        <div className="col-span-2 mb-2 md:col-span-1">
                            <Label htmlFor="capacity" required={true}>
                                Capacity
                            </Label>
                            <Input
                                type="number"
                                id="capacity"
                                name="capacity"
                                placeholder="Enter Capacity"
                                defaultValue={data.capacity}
                                onChange={(e) =>
                                    setData('capacity', e.target.value)
                                }
                            />
                            <ValidationFeedback message={errors.capacity} />
                        </div>
                        <div className="col-span-2 mb-2 md:col-span-1">
                            <Label htmlFor="description" required={true}>
                                Description
                            </Label>
                            <Textarea
                                id="description"
                                name="description"
                                placeholder="Enter Description"
                                defaultValue={data.description}
                                onChange={(e) =>
                                    setData('description', e.target.value)
                                }
                            />
                            <ValidationFeedback message={errors.description} />
                        </div>
                        <div className="col-span-2 flex items-center justify-end gap-2">
                            <Anchor
                                variant="secondary"
                                href={route('admin.beds.index')}
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
                                Update Bed
                            </Button>
                        </div>
                    </form>
                </div>
            </AdminLayout>
        </>
    )
}
