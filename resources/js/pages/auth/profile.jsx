import Button from '@/components/form/button'
import Input from '@/components/form/input'
import Label from '@/components/form/label'
import ValidationFeedback from '@/components/form/validation-feedback'
import OrganizerLayout from '@/layouts/organizer-layout'
import { ArrowPathIcon } from '@heroicons/react/24/outline'
import { Head, useForm } from '@inertiajs/react'
import { useState } from 'react'
import Modal from 'react-responsive-modal'

export default function Edit({ user }) {
    const [method, setMethod] = useState('GET')
    const [openModal, setOpenModal] = useState(false)
    const { data, setData, put, processing, errors } = useForm({
        name: user.name,
        email: user.email,
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        put(route('profile.update'), {
            preserveScroll: true,
            onSuccess: () => {
                setMethod('GET')
            },
        })
    }

    const {
        data: dataPassword,
        setData: setDataPassword,
        errors: errorsPassword,
        put: putPassword,
        processing: processingPassword,
    } = useForm({
        current_password: '',
        new_password: '',
    })

    const handleSubmitPassword = (e) => {
        e.preventDefault()
        putPassword(route('profile.update-password'), {
            preserveScroll: true,
            onSuccess: () => {
                setOpenModal(false)
            },
        })
    }

    return (
        <>
            <Head title="Profile" />

            <OrganizerLayout>
                <div className="rounded-2xl border border-gray-200 bg-white p-4 md:p-6">
                    <div className="mb-4 flex items-center justify-between">
                        <h1 className="text-2xl font-bold">Profile</h1>

                        <Button
                            variant="success"
                            onClick={() => setMethod('PUT')}
                            className={method === 'PUT' ? 'hidden' : ''}
                        >
                            Edit
                        </Button>
                    </div>

                    <form
                        className="grid grid-cols-1 gap-6 md:grid-cols-2"
                        method="POST"
                    >
                        <div className="col-span-2 mb-2 md:col-span-1">
                            <Label htmlFor="name" required>
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
                                className={errors.name && 'ring ring-red-500'}
                                disabled={method === 'GET'}
                            />
                            <ValidationFeedback message={errors.name} />
                        </div>
                        <div className="col-span-2 mb-2 md:col-span-1">
                            <Label htmlFor="email" required>
                                Email
                            </Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Enter Email"
                                defaultValue={data.email}
                                onChange={(e) =>
                                    setData('email', e.target.value)
                                }
                                className={errors.email && 'ring ring-red-500'}
                                disabled={method === 'GET'}
                            />
                            <ValidationFeedback message={errors.email} />
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
                        <div
                            className={`col-span-2 flex items-center justify-end gap-2 ${
                                method === 'GET' ? 'hidden' : ''
                            }`}
                        >
                            <Button
                                variant="danger"
                                onClick={() => setMethod('GET')}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="success"
                                onClick={handleSubmit}
                                className={'flex items-center gap-2'}
                                disabled={processing}
                            >
                                {processing && (
                                    <ArrowPathIcon className="size-5 animate-spin" />
                                )}
                                Update
                            </Button>
                        </div>
                    </form>
                </div>
            </OrganizerLayout>

            <Modal open={openModal} onClose={() => setOpenModal(false)} center>
                <h2 className="mb-3 text-xl font-bold">Change Password</h2>
                <div>
                    <div className="mb-4">
                        <Label htmlFor="current_password" required={true}>
                            Current Password
                        </Label>
                        <Input
                            id="current_password"
                            name="current_password"
                            type="password"
                            placeholder="Enter Current Password"
                            defaultValue={dataPassword.current_password}
                            onChange={(e) =>
                                setDataPassword(
                                    'current_password',
                                    e.target.value
                                )
                            }
                        />
                        <ValidationFeedback
                            message={errorsPassword.current_password}
                        />
                    </div>
                    <div className="mb-4">
                        <Label htmlFor="new_password" required={true}>
                            New Password
                        </Label>
                        <Input
                            id="new_password"
                            name="new_password"
                            type="password"
                            placeholder="Enter New Password"
                            defaultValue={dataPassword.new_password}
                            onChange={(e) =>
                                setDataPassword('new_password', e.target.value)
                            }
                        />
                        <ValidationFeedback
                            message={errorsPassword.new_password}
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
