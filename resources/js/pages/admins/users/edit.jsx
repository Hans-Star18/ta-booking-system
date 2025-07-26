import Anchor from '@/components/form/anchor'
import Button from '@/components/form/button'
import Input from '@/components/form/input'
import Label from '@/components/form/label'
import Select from '@/components/form/select'
import ValidationFeedback from '@/components/form/validation-feedback'
import AdminLayout from '@/layouts/admin-layout'
import { ArrowPathIcon } from '@heroicons/react/24/outline'
import { Head, useForm } from '@inertiajs/react'
import { useState } from 'react'
import Modal from 'react-responsive-modal'

export default function Edit({ user, roles }) {
    const [openModal, setOpenModal] = useState(false)

    const { data, setData, put, processing, errors } = useForm({
        name: user.name,
        email: user.email,
        role_id: user.role.id,
    })

    const {
        setData: setDataPassword,
        errors: errorsPassword,
        put: putPassword,
        processing: processingPassword,
    } = useForm({
        password: '',
        password_confirmation: '',
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        put(route('admin.users.update', user.id), {
            preserveScroll: true,
        })
    }

    const handleSubmitPassword = (e) => {
        e.preventDefault()
        putPassword(route('admin.users.update-password', user.id), {
            preserveScroll: true,
            onSuccess: () => {
                setOpenModal(false)
            },
        })
    }
    return (
        <>
            <Head title="Admin User Detail" />

            <AdminLayout>
                <div className="rounded-2xl border border-gray-200 bg-white p-4 md:p-6">
                    <div className="mb-4 flex items-center justify-between">
                        <h1 className="text-2xl font-bold">User Detail</h1>
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
                            <Label htmlFor="password">Change Password</Label>
                            <Button
                                variant="primary"
                                className={'flex items-center gap-2'}
                                disabled={processing}
                                onClick={() => setOpenModal(true)}
                            >
                                Change Password
                            </Button>
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
                                Update User
                            </Button>
                        </div>
                    </form>
                </div>
            </AdminLayout>

            <Modal open={openModal} onClose={() => setOpenModal(false)} center>
                <h2 className="mb-3 text-xl font-bold">Change Password</h2>
                <div>
                    <div className="mb-4">
                        <Label htmlFor="password" required={true}>
                            Password
                        </Label>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Enter Password"
                            onChange={(e) =>
                                setDataPassword('password', e.target.value)
                            }
                        />
                        <ValidationFeedback message={errorsPassword.password} />
                    </div>
                    <div className="mb-4">
                        <Label htmlFor="password_confirmation" required={true}>
                            Confirm Password
                        </Label>
                        <Input
                            id="password_confirmation"
                            name="password_confirmation"
                            type="password"
                            placeholder="Enter Confirm Password"
                            onChange={(e) =>
                                setDataPassword(
                                    'password_confirmation',
                                    e.target.value
                                )
                            }
                        />
                        <ValidationFeedback
                            message={errorsPassword.password_confirmation}
                        />
                    </div>

                    <div className="flex items-center justify-end gap-2">
                        <Button
                            variant="secondary"
                            onClick={() => setOpenModal(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="success"
                            onClick={handleSubmitPassword}
                            disabled={processingPassword}
                        >
                            Save
                        </Button>
                    </div>
                </div>
            </Modal>
        </>
    )
}
