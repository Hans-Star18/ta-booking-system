import Anchor from '@/components/form/anchor'
import Button from '@/components/form/button'
import Input from '@/components/form/input'
import Label from '@/components/form/label'
import ValidationFeedback from '@/components/form/validation-feedback'
import AdminLayout from '@/layouts/admin-layout'
import { ArrowPathIcon } from '@heroicons/react/24/outline'
import { Head, useForm } from '@inertiajs/react'

export default function Add() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        post(route('admin.policies.store'), {
            preserveScroll: true,
        })
    }

    return (
        <>
            <Head title="Admin Policy Add" />

            <AdminLayout>
                <div className="rounded-2xl border border-gray-200 bg-white p-4 md:p-6">
                    <div className="mb-4 flex items-center justify-between">
                        <h1 className="text-2xl font-bold">Policy Add</h1>
                    </div>

                    <form
                        className="grid grid-cols-1 gap-6 md:grid-cols-2"
                        method="POST"
                    >
                        <div className="col-span-2 mb-2 md:col-span-1">
                            <Label htmlFor="name" required={true}>
                                Policy Name
                            </Label>
                            <Input
                                id="name"
                                name="name"
                                placeholder="Enter Policy Name"
                                defaultValue={data.name}
                                onChange={(e) =>
                                    setData('name', e.target.value)
                                }
                            />
                            <ValidationFeedback message={errors.name} />
                        </div>
                        <div className="col-span-2 flex items-center justify-end gap-2">
                            <Anchor
                                variant="secondary"
                                href={route('admin.policies.index')}
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
                                Add Policy
                            </Button>
                        </div>
                    </form>
                </div>
            </AdminLayout>
        </>
    )
}
