export default function Stepper({ step }) {
    return (
        <>
            <div className="grid grid-cols-4 gap-8">
                <div
                    className={`rounded-md border border-blue-400 p-3 ${
                        step === 1 ? 'bg-blue-200' : ''
                    }`}
                >
                    <div className="flex items-center justify-center gap-4 text-center text-lg font-normal">
                        <span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512 512"
                                className="size-5"
                            >
                                <path
                                    fill="currentColor"
                                    d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"
                                />
                            </svg>
                        </span>
                        <span className="hidden lg:inline">
                            Search Accomodation
                        </span>
                    </div>
                </div>

                <div
                    className={`rounded-md border border-blue-400 p-3 ${
                        step === 2 ? 'bg-blue-200' : ''
                    }`}
                >
                    <div className="flex items-center justify-center gap-4 text-center text-lg font-normal">
                        <span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 320 512"
                                className="size-5"
                            >
                                <path
                                    fill="currentColor"
                                    d="M160 0c17.7 0 32 14.3 32 32V67.7c1.6 .2 3.1 .4 4.7 .7c.4 .1 .7 .1 1.1 .2l48 8.8c17.4 3.2 28.9 19.9 25.7 37.2s-19.9 28.9-37.2 25.7l-47.5-8.7c-31.3-4.6-58.9-1.5-78.3 6.2s-27.2 18.3-29 28.1c-2 10.7-.5 16.7 1.2 20.4c1.8 3.9 5.5 8.3 12.8 13.2c16.3 10.7 41.3 17.7 73.7 26.3l2.9 .8c28.6 7.6 63.6 16.8 89.6 33.8c14.2 9.3 27.6 21.9 35.9 39.5c8.5 17.9 10.3 37.9 6.4 59.2c-6.9 38-33.1 63.4-65.6 76.7c-13.7 5.6-28.6 9.2-44.4 11V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V445.1c-.4-.1-.9-.1-1.3-.2l-.2 0 0 0c-24.4-3.8-64.5-14.3-91.5-26.3c-16.1-7.2-23.4-26.1-16.2-42.2s26.1-23.4 42.2-16.2c20.9 9.3 55.3 18.5 75.2 21.6c31.9 4.7 58.2 2 76-5.3c16.9-6.9 24.6-16.9 26.8-28.9c1.9-10.6 .4-16.7-1.3-20.4c-1.9-4-5.6-8.4-13-13.3c-16.4-10.7-41.5-17.7-74-26.3l-2.8-.7 0 0C119.4 279.3 84.4 270 58.4 253c-14.2-9.3-27.5-22-35.8-39.6c-8.4-17.9-10.1-37.9-6.1-59.2C23.7 116 52.3 91.2 84.8 78.3c13.3-5.3 27.9-8.9 43.2-11V32c0-17.7 14.3-32 32-32z"
                                />
                            </svg>
                        </span>
                        <span className="hidden lg:inline">Room & Rates</span>
                    </div>
                </div>

                <div
                    className={`rounded-md border border-blue-400 p-3 ${
                        step === 3 ? 'bg-blue-200' : ''
                    }`}
                >
                    <div className="flex items-center justify-center gap-4 text-center text-lg font-normal">
                        <span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 448 512"
                                className="size-5"
                            >
                                <path
                                    fill="currentColor"
                                    d="M128 0c13.3 0 24 10.7 24 24V64H296V24c0-13.3 10.7-24 24-24s24 10.7 24 24V64h40c35.3 0 64 28.7 64 64v16 48V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V192 144 128C0 92.7 28.7 64 64 64h40V24c0-13.3 10.7-24 24-24zM400 192H48V448c0 8.8 7.2 16 16 16H384c8.8 0 16-7.2 16-16V192zM329 297L217 409c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47 95-95c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"
                                />
                            </svg>
                        </span>
                        <span className="hidden lg:inline">
                            Confirm Booking
                        </span>
                    </div>
                </div>

                <div
                    className={`rounded-md border border-blue-400 p-3 ${
                        step === 4 ? 'bg-blue-200' : ''
                    }`}
                >
                    <div className="flex items-center justify-center gap-4 text-center text-lg font-normal">
                        <span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 448 512"
                                className="size-5"
                            >
                                <path
                                    fill="currentColor"
                                    d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"
                                />
                            </svg>
                        </span>
                        <span className="hidden lg:inline">Finish Booking</span>
                    </div>
                </div>
            </div>
        </>
    )
}
