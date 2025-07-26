import Anchor from '@/components/form/anchor'
import OrganizerLayout from '@/layouts/organizer-layout'
import { Head, useForm } from '@inertiajs/react'
import Label from '@/components/form/label'
import Input from '@/components/form/input'
import ValidationFeedback from '@/components/form/validation-feedback'
import Button from '@/components/form/button'
import { ArrowPathIcon } from '@heroicons/react/24/outline'

export default function Index({ setting }) {
    const { setData, put, processing, errors } = useForm({
        midtrans_client_key: setting.midtrans_client_key,
        midtrans_server_key: setting.midtrans_server_key,
        dp_percentage: setting.dp_percentage,
        tax_percentage: setting.tax_percentage,
        extra_bed_price: setting.extra_bed_price,
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        put(route('organizer.settings.update', setting.id), {
            onSuccess: () => {},
        })
    }

    return (
        <>
            <Head title="Organizer Settings" />

            <OrganizerLayout>
                <div className="rounded-2xl border border-gray-200 bg-white p-4 md:p-6">
                    <div className="mb-4 flex items-center justify-between">
                        <h1 className="text-2xl font-bold">Settings</h1>
                    </div>

                    <form
                        className="grid grid-cols-1 gap-6 md:grid-cols-3"
                        method="POST"
                    >
                        <div className="col-span-3 mb-2 md:col-span-1">
                            <Label
                                htmlFor="midtrans_client_key"
                                required={true}
                            >
                                Midtrans Client Key
                            </Label>
                            <Input
                                id="midtrans_client_key"
                                name="midtrans_client_key"
                                placeholder="Enter Midtrans Client Key"
                                defaultValue={setting.midtrans_client_key}
                                onChange={(e) =>
                                    setData(
                                        'midtrans_client_key',
                                        e.target.value
                                    )
                                }
                                className={
                                    errors.midtrans_client_key &&
                                    'ring ring-red-500'
                                }
                            />
                            <ValidationFeedback
                                message={errors.midtrans_client_key}
                            />
                        </div>
                        <div className="col-span-3 mb-2 md:col-span-1">
                            <Label
                                htmlFor="midtrans_server_key"
                                required={true}
                            >
                                Midtrans Server Key
                            </Label>
                            <Input
                                id="midtrans_server_key"
                                name="midtrans_server_key"
                                placeholder="Enter Midtrans Server Key"
                                defaultValue={setting.midtrans_server_key}
                                onChange={(e) =>
                                    setData(
                                        'midtrans_server_key',
                                        e.target.value
                                    )
                                }
                                className={
                                    errors.midtrans_server_key &&
                                    'ring ring-red-500'
                                }
                            />
                            <ValidationFeedback
                                message={errors.midtrans_server_key}
                            />
                        </div>
                        <div className="col-span-3 mb-2 md:col-span-1">
                            <Label htmlFor="dp_percentage" required={true}>
                                DP Percentage
                            </Label>
                            <Input
                                id="dp_percentage"
                                name="dp_percentage"
                                type="number"
                                placeholder="Enter DP Percentage"
                                defaultValue={setting.dp_percentage}
                                onChange={(e) =>
                                    setData('dp_percentage', e.target.value)
                                }
                                className={
                                    errors.dp_percentage && 'ring ring-red-500'
                                }
                            />
                            <ValidationFeedback
                                message={errors.dp_percentage}
                            />
                        </div>
                        <div className="col-span-3 mb-2 md:col-span-1">
                            <Label htmlFor="tax_percentage" required={true}>
                                Tax Percentage
                            </Label>
                            <Input
                                id="tax_percentage"
                                name="tax_percentage"
                                type="number"
                                placeholder="Enter Tax Percentage"
                                defaultValue={setting.tax_percentage}
                                onChange={(e) =>
                                    setData('tax_percentage', e.target.value)
                                }
                                className={
                                    errors.tax_percentage && 'ring ring-red-500'
                                }
                            />
                            <ValidationFeedback
                                message={errors.tax_percentage}
                            />
                        </div>
                        <div className="col-span-3 mb-2 md:col-span-1">
                            <Label htmlFor="extra_bed_price" required={true}>
                                Extra Bed Price
                            </Label>
                            <Input
                                id="extra_bed_price"
                                name="extra_bed_price"
                                type="number"
                                placeholder="Enter Extra Bed Price"
                                defaultValue={setting.extra_bed_price}
                                onChange={(e) =>
                                    setData('extra_bed_price', e.target.value)
                                }
                                className={
                                    errors.extra_bed_price &&
                                    'ring ring-red-500'
                                }
                            />
                            <ValidationFeedback
                                message={errors.extra_bed_price}
                            />
                        </div>

                        <div className="col-span-3 flex items-center justify-end gap-2">
                            <Anchor
                                variant="secondary"
                                href={route('organizer.settings.index')}
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
                                Update Settings
                            </Button>
                        </div>
                    </form>
                </div>
            </OrganizerLayout>
        </>
    )
}
