import {
    CalendarDaysIcon,
    CheckIcon,
    CurrencyDollarIcon,
    MagnifyingGlassIcon,
} from '@heroicons/react/24/outline'

export default function Stepper({ step }) {
    return (
        <>
            <div className="grid grid-cols-4 gap-8">
                <div
                    className={`rounded-md border border-blue-400 p-3 text-gray-500 ${
                        step === 1 ? 'bg-blue-100 text-slate-900' : ''
                    }`}
                >
                    <div className="flex items-center justify-center gap-4 text-center text-lg font-normal">
                        <MagnifyingGlassIcon className="size-6" />
                        <span className="hidden lg:inline">
                            Search Accomodation
                        </span>
                    </div>
                </div>

                <div
                    className={`rounded-md border border-blue-400 p-3 text-gray-500 ${
                        step === 2 ? 'bg-blue-100 text-slate-900' : ''
                    }`}
                >
                    <div className="flex items-center justify-center gap-4 text-center text-lg font-normal">
                        <CurrencyDollarIcon className="size-6" />
                        <span className="hidden lg:inline">Room & Rates</span>
                    </div>
                </div>

                <div
                    className={`rounded-md border border-blue-400 p-3 text-gray-500 ${
                        step === 3 ? 'bg-blue-100 text-slate-900' : ''
                    }`}
                >
                    <div className="flex items-center justify-center gap-4 text-center text-lg font-normal">
                        <CalendarDaysIcon className="size-6" />
                        <span className="hidden lg:inline">
                            Confirm Booking
                        </span>
                    </div>
                </div>

                <div
                    className={`rounded-md border border-blue-400 p-3 text-gray-500 ${
                        step === 4 ? 'bg-blue-100 text-slate-900' : ''
                    }`}
                >
                    <div className="flex items-center justify-center gap-4 text-center text-lg font-normal">
                        <CheckIcon className="size-6" />
                        <span className="hidden lg:inline">Finish Booking</span>
                    </div>
                </div>
            </div>
        </>
    )
}
