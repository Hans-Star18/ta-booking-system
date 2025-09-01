import LoadAlert from '@/components/alert/load-alert'
import Toast from '@/components/alert/toast'
import Button from '@/components/form/button'
// import CustomerHeader from '@/components/header/customer-header'
import Stepper from '@/components/stepper'
import {
    DevicePhoneMobileIcon,
    DocumentTextIcon,
    EnvelopeIcon,
    GlobeAltIcon,
    MapPinIcon,
    PhoneIcon,
} from '@heroicons/react/24/outline'
import { Link } from '@inertiajs/react'
import HTMLReactParser from 'html-react-parser'
import { useState } from 'react'
import Modal from 'react-responsive-modal'

export default function CustomerLayout({ children, currenStep = 1, hotel }) {
    const [open, setOpen] = useState(false)
    const alert = LoadAlert()

    return (
        <>
            {alert && (
                <Toast
                    message={alert.message}
                    type={alert.type}
                    id={alert._id}
                />
            )}

            {/* <CustomerHeader hotel={hotel} /> */}

            <div className="px-6 lg:px-10">
                <div className="container m-auto pt-10 md:max-w-7xl">
                    <div className="mb-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                            <div className="flex-1">
                                <h1 className="mb-4 text-3xl font-bold text-gray-900">
                                    <Link
                                        href={route(
                                            'customer.reservation.index',
                                            {
                                                hotel: hotel.uuid,
                                            }
                                        )}
                                    >
                                        {hotel.name}
                                    </Link>
                                </h1>

                                <div className="grid grid-cols-1 gap-4 text-sm text-gray-600 md:grid-cols-2">
                                    <div className="flex items-center gap-2">
                                        <MapPinIcon className="h-4 w-4 text-gray-400" />
                                        <span>{hotel.address ?? 'N/A'}</span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <PhoneIcon className="h-4 w-4 text-gray-400" />
                                        <span>{hotel.phone ?? 'N/A'}</span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <DevicePhoneMobileIcon className="h-4 w-4 text-gray-400" />
                                        <span>{hotel.mobile ?? 'N/A'}</span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <EnvelopeIcon className="h-4 w-4 text-gray-400" />
                                        <span>{hotel.email ?? 'N/A'}</span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <GlobeAltIcon className="h-4 w-4 text-gray-400" />
                                        <a
                                            href={hotel.website ?? '#'}
                                            className="text-blue-600 hover:underline"
                                            target="_blank"
                                        >
                                            {hotel.website ?? 'N/A'}
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div className="flex-shrink-0">
                                <Button
                                    variant="outline"
                                    className="flex items-center gap-2 bg-transparent py-2"
                                    onClick={() => setOpen(true)}
                                >
                                    <DocumentTextIcon className="h-4 w-4" />
                                    Terms & Conditions
                                </Button>
                            </div>
                        </div>
                    </div>

                    <Stepper step={currenStep} />
                    {children}
                </div>
            </div>

            <Modal
                open={open}
                onClose={() => setOpen(false)}
                center
                classNames={{
                    modal: 'md:w-full rounded-lg',
                }}
            >
                <h2 className="mt-4 mb-3 text-xl font-bold md:mt-0">
                    Terms & Conditions
                </h2>
                <div className="text-sm text-gray-600">
                    {HTMLReactParser(hotel.term_and_condition ?? 'N/A')}
                </div>
            </Modal>
        </>
    )
}
