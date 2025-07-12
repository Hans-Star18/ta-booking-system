import Anchor from '@/components/form/anchor'
import Button from '@/components/form/button'
import Input from '@/components/form/input'
import Label from '@/components/form/label'
import TextEditor from '@/components/form/text-editor'
import { Textarea } from '@/components/form/textarea'
import ValidationFeedback from '@/components/form/validation-feedback'
import OrganizerLayout from '@/layouts/organizer-layout'
import { ArrowPathIcon } from '@heroicons/react/24/outline'
import { Head, useForm } from '@inertiajs/react'

export default function Edit({ hotel }) {
    const { data, setData, put, processing, errors } = useForm({
        name: hotel.name,
        address: hotel.address,
        phone: hotel.phone,
        mobile: hotel.mobile,
        email: hotel.email,
        term_and_condition: hotel.term_and_condition,
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        put(route('organizer.hotels.update', hotel.id), {
            onSuccess: () => {},
        })
    }

    return (
        <>
            <Head title="Organizer Hotel Management" />

            <OrganizerLayout>
                <div className="rounded-2xl border border-gray-200 bg-white p-4 md:p-6">
                    <div className="mb-4">
                        <h1 className="text-2xl font-bold">Edit Hotel</h1>
                    </div>

                    <form
                        className="grid grid-cols-1 gap-6 md:grid-cols-3"
                        method="POST"
                    >
                        <div className="col-span-3 mb-2 md:col-span-1">
                            <Label htmlFor="name" required={true}>
                                Hotel Name
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

                        <div className="col-span-3 mb-2 md:col-span-1">
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
                        <div className="col-span-3 mb-2 md:col-span-1">
                            <Label htmlFor="mobile" required={true}>
                                Mobile
                            </Label>
                            <Input
                                id="mobile"
                                name="mobile"
                                placeholder="Enter Hotel Mobile"
                                defaultValue={data.mobile}
                                onChange={(e) =>
                                    setData('mobile', e.target.value)
                                }
                                className={errors.mobile && 'ring ring-red-500'}
                            />
                            <ValidationFeedback message={errors.mobile} />
                        </div>
                        <div className="col-span-3 mb-2 md:col-span-1">
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
                        <div className="col-span-3 mb-2 md:col-span-2">
                            <Label htmlFor="address" required={true}>
                                Address
                            </Label>
                            <Textarea
                                id="address"
                                name="address"
                                placeholder="Enter Hotel Address"
                                onChange={(e) =>
                                    setData('address', e.target.value)
                                }
                                className={
                                    errors.address && 'ring ring-red-500'
                                }
                                rows={1}
                                defaultValue={data.address}
                            />
                            <ValidationFeedback message={errors.address} />
                        </div>
                        <div className="col-span-3 mb-2 md:col-span-3">
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
                        <div className="col-span-3 flex items-center justify-end gap-2">
                            <Anchor
                                variant="secondary"
                                href={route('organizer.hotels.index')}
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
            </OrganizerLayout>
        </>
    )
}
// Compare this snippet from resources/js/components/form/validation-feedback.jsx:
