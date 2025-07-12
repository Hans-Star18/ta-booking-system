import Anchor from '@/components/form/anchor'
import OrganizerLayout from '@/layouts/organizer-layout'
import { Head, usePage } from '@inertiajs/react'
import Currency from '@/components/format/currency'
import CopyInput from '@/components/form/copy-input'

export default function Index({ hotel, setting }) {
    const baseUrl = usePage().props.base_url

    return (
        <>
            <Head title="Organizer Settings" />

            <OrganizerLayout>
                <div className="rounded-2xl border border-gray-200 bg-white p-4 md:p-6">
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
                        <hr className="col-span-3 text-gray-300" />
                        <div className="col-span-3 mb-4">
                            <h2 className="text-sm text-gray-500">
                                Link to access booking page
                            </h2>
                            <div>
                                <CopyInput
                                    value={`${baseUrl}/${hotel.uuid}`}
                                    readOnly={true}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </OrganizerLayout>
        </>
    )
}
