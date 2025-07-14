import Anchor from '@/components/form/anchor'
import Button from '@/components/form/button'
import Input from '@/components/form/input'
import Label from '@/components/form/label'
import Select from '@/components/form/select'
import ValidationFeedback from '@/components/form/validation-feedback'
import AdminLayout from '@/layouts/admin-layout'
import {
    ArrowPathIcon,
    EyeIcon,
    EyeSlashIcon,
} from '@heroicons/react/24/outline'
import { Head, useForm } from '@inertiajs/react'
import { useState } from 'react'

export default function Add({ roles }) {
    const [showPassword, setShowPassword] = useState(false)

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        role_id: '',
        password: '',
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        post(route('admin.users.store'), {
            preserveScroll: true,
        })
    }

    return (
        <>
            <Head title="Admin User Add" />

            <AdminLayout>
                <div className="rounded-2xl border border-gray-200 bg-white p-4 md:p-6">
                    <div className="mb-4 flex items-center justify-between">
                        <h1 className="text-2xl font-bold">User Add</h1>
                    </div>

                    <form
                        className="grid grid-cols-1 gap-6 md:grid-cols-2"
                        encType="multipart/form-data"
                        method="POST"
                    >
                        <div className="col-span-2 mb-2 md:col-span-1">
                            <Label htmlFor="name" required={true}>
                                Name
                            </Label>
                            <Input
                                id="name"
                                name="name"
                                placeholder="Enter Name"
                                defaultValue={data.name}
                                onChange={(e) =>
                                    setData('name', e.target.value)
                                }
                            />
                            <ValidationFeedback message={errors.name} />
                        </div>
                        <div className="col-span-2 mb-2 md:col-span-1">
                            <Label htmlFor="email" required={true}>
                                Email
                            </Label>
                            <Input
                                id="email"
                                name="email"
                                placeholder="Enter Email"
                                defaultValue={data.email}
                                onChange={(e) =>
                                    setData('email', e.target.value)
                                }
                            />
                            <ValidationFeedback message={errors.email} />
                        </div>
                        <div className="col-span-2 mb-2 md:col-span-1">
                            <Label htmlFor="role_id" required={true}>
                                Role
                            </Label>
                            <Select
                                id="role_id"
                                name="role_id"
                                options={roles}
                                defaultValue={data.role_id}
                                onChange={(e) =>
                                    setData('role_id', e.target.value)
                                }
                            />
                            <ValidationFeedback message={errors.role_id} />
                        </div>
                        <div className="col-span-2 mb-2 md:col-span-1">
                            <Label htmlFor={'password'} required={true}>
                                Password
                            </Label>
                            <div className="relative">
                                <Input
                                    id={'password'}
                                    name={'password'}
                                    type={showPassword ? 'text' : 'password'}
                                    defaultValue={data.password}
                                    onChange={(e) =>
                                        setData('password', e.target.value)
                                    }
                                    placeholder="Enter your password"
                                    className={
                                        errors.password && 'ring ring-red-500'
                                    }
                                />

                                <span
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    className="absolute top-1/2 right-4 z-30 -translate-y-1/2 cursor-pointer"
                                >
                                    {showPassword ? (
                                        <EyeIcon className="size-5 text-gray-500" />
                                    ) : (
                                        <EyeSlashIcon className="size-5 text-gray-500" />
                                    )}
                                </span>
                            </div>
                            <ValidationFeedback message={errors.password} />
                        </div>
                        <div className="col-span-2 flex items-center justify-end gap-2">
                            <Anchor
                                variant="secondary"
                                href={route('admin.users.index')}
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
                                Add User
                            </Button>
                        </div>
                    </form>
                </div>
            </AdminLayout>
        </>
    )
}
