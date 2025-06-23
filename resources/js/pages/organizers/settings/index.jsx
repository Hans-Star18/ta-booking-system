import Anchor from '@/components/form/anchor'
import OrganizerLayout from '@/layouts/organizer-layout'
import { Head, useForm } from '@inertiajs/react'
import { formatWebsiteUrl, formatEmailUrl } from '@/utils/format'
import HTMLReactParser from 'html-react-parser'
import Label from '@/components/form/label'
import Input from '@/components/form/input'
import ValidationFeedback from '@/components/form/validation-feedback'
import Currency from '@/components/format/currency'

export default function Index({ setting }) {
    return (
        <>
            <Head title="Organizer Settings" />

            <OrganizerLayout>
                <div className="min-h-screen rounded-2xl border border-gray-200 bg-white p-4 md:p-6">
                    <div className="mb-4 flex items-center justify-between">
                        <h1 className="text-2xl font-bold">Settings</h1>

                        <Anchor
                            variant="success"
                            href={route('organizer.settings.edit', setting.id)}
                        >
                            Edit
                        </Anchor>
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                        <div className="col-span-3 mb-4 md:col-span-1">
                            <h2 className="text-base text-gray-500 italic">
                                Midtrans Client Key
                            </h2>
                            <p className="text-base">
                                {setting.midtrans_client_key || '-'}
                            </p>
                        </div>
                        <div className="col-span-3 mb-4 md:col-span-1">
                            <h2 className="text-base text-gray-500 italic">
                                Midtrans Server Key
                            </h2>
                            <p className="text-base">
                                {setting.midtrans_server_key || '-'}
                            </p>
                        </div>
                        <div className="col-span-3 mb-4 md:col-span-1">
                            <h2 className="text-base text-gray-500 italic">
                                Down Payment Percentage
                            </h2>
                            <p className="text-base">
                                {setting.dp_percentage || '-'} %
                            </p>
                        </div>
                        <div className="col-span-3 mb-4 md:col-span-1">
                            <h2 className="text-base text-gray-500 italic">
                                Tax Percentage
                            </h2>
                            <p className="text-base">
                                {setting.tax_percentage || '-'} %
                            </p>
                        </div>
                        <div className="col-span-3 mb-4 md:col-span-1">
                            <h2 className="text-base text-gray-500 italic">
                                Extra Bed Price
                            </h2>
                            <p className="text-base">
                                <Currency value={setting.extra_bed_price} />
                            </p>
                        </div>
                    </div>
                </div>
            </OrganizerLayout>
        </>
    )
}
