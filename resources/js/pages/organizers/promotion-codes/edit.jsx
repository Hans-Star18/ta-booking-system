import Anchor from '@/components/form/anchor'
import Button from '@/components/form/button'
import { HelperText } from '@/components/form/helper-text'
import Input from '@/components/form/input'
import Label from '@/components/form/label'
import Select from '@/components/form/select'
import ValidationFeedback from '@/components/form/validation-feedback'
import OrganizerLayout from '@/layouts/organizer-layout'
import { ArrowPathIcon } from '@heroicons/react/24/outline'
import { Head, router, useForm } from '@inertiajs/react'
import Flatpickr from 'react-flatpickr'

export default function Edit({ promotionCode }) {
    const { data, setData, put, processing, errors } = useForm({
        code: promotionCode.code,
        discount: promotionCode.discount,
        valid_until: promotionCode.valid_until,
        is_active: promotionCode.is_active,
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        put(route('organizer.promotion-codes.update', promotionCode.id), {
            preserveScroll: true,
            onSuccess: (response) => {
                router.reload({ only: ['promotionCodes'] })
            },
        })
    }

    return (
        <>
            <Head title="Add Promotion Code" />

            <OrganizerLayout>
                <div className="rounded-2xl border border-gray-200 bg-white p-4 md:p-6">
                    <div className="mb-4 flex items-center justify-between">
                        <h1 className="text-2xl font-bold">
                            Add Promotion Code
                        </h1>
                    </div>

                    <form
                        className="grid grid-cols-1 gap-6 md:grid-cols-2"
                        encType="multipart/form-data"
                        method="POST"
                    >
                        <div className="col-span-2 mb-2 md:col-span-1">
                            <Label htmlFor="code" required={true}>
                                Promotion Code
                            </Label>
                            <Input
                                id="code"
                                name="code"
                                placeholder="Enter Promotion Code"
                                defaultValue={data.code}
                                onChange={(e) =>
                                    setData('code', e.target.value)
                                }
                                className={errors.code && 'ring ring-red-500'}
                            />
                            <ValidationFeedback message={errors.code} />
                        </div>
                        <div className="col-span-2 mb-2 md:col-span-1">
                            <Label htmlFor="discount" required={true}>
                                Discount Percentage
                            </Label>
                            <Input
                                id="discount"
                                name="discount"
                                placeholder="Enter Discount Percentage"
                                type="number"
                                defaultValue={data.discount}
                                onChange={(e) =>
                                    setData(
                                        'discount',
                                        parseInt(e.target.value) || ''
                                    )
                                }
                                className={
                                    errors.discount && 'ring ring-red-500'
                                }
                            />
                            <HelperText message="Discount percentage must be between 1 and 100" />
                            <ValidationFeedback message={errors.discount} />
                        </div>
                        <div className="col-span-2 mb-2 md:col-span-1">
                            <Label htmlFor="valid_until" required={true}>
                                Valid Until
                            </Label>
                            <div
                                className={`h-11 w-full appearance-none rounded-lg border border-gray-300 bg-white px-2 py-2.5 focus:border-blue-300 focus:ring-3 focus:ring-blue-500/20 focus:outline-none md:px-4 ${
                                    errors.valid_until
                                        ? 'ring ring-red-500'
                                        : ''
                                }`}
                            >
                                <Flatpickr
                                    value={data.valid_until}
                                    onChange={(selectedDates) => {
                                        setData(
                                            'valid_until',
                                            selectedDates[0]
                                                .toISOString()
                                                .split('T')[0]
                                        )
                                    }}
                                    options={{
                                        disableMobile: 'true',
                                        minDate: 'today',
                                        dateFormat: 'd F Y',
                                    }}
                                    className="h-full w-full focus:outline-none"
                                    placeholder="Valid Until"
                                />
                            </div>
                            <ValidationFeedback message={errors.valid_until} />
                        </div>
                        <div className="col-span-2 mb-2 md:col-span-1">
                            <Label htmlFor="is_active" required={true}>
                                Status
                            </Label>
                            <Select
                                id="is_active"
                                name="is_active"
                                options={[
                                    { value: true, label: 'Active' },
                                    { value: false, label: 'Inactive' },
                                ]}
                                defaultValue={data.is_active}
                                onChange={(e) =>
                                    setData('is_active', e.target.value)
                                }
                            />
                            <ValidationFeedback message={errors.is_active} />
                        </div>
                        <div className="col-span-2 flex items-center justify-end gap-2">
                            <Anchor
                                variant="secondary"
                                href={route('organizer.promotion-codes.index')}
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
                                Update Promotion Code
                            </Button>
                        </div>
                    </form>
                </div>
            </OrganizerLayout>
        </>
    )
}
