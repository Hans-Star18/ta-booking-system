import AuthLayout from '@/layouts/auth-layout'
import { Head, Link, useForm } from '@inertiajs/react'
import Label from '@/components/form/label'
import Input from '@/components/form/input'
import { ArrowPathIcon } from '@heroicons/react/24/outline'
import Button from '@/components/form/button'
import ValidationFeedback from '@/components/form/validation-feedback'
import { Textarea } from '@/components/form/textarea'

export default function Register() {
    const { data, setData, post, processing, errors } = useForm({
        hotel_name: '',
        hotel_address: '',
        hotel_phone: '',
        hotel_website: '',
        name: '',
        email: '',
    })

    const submit = (e) => {
        e.preventDefault()
        post(route('auth.register'), {
            onSuccess: () => {
                setData({
                    hotel_name: '',
                    hotel_address: '',
                    hotel_phone: '',
                    hotel_website: '',
                    name: '',
                    email: '',
                })
            },
            onError: () => {},
            preserveScroll: true,
        })
    }

    return (
        <>
            <Head title="Register" />

            <AuthLayout>
                <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col justify-center">
                    <div>
                        <div className="mb-5 text-center sm:mb-8">
                            <h1 className="line mb-2 text-[30px] leading-[38px] font-semibold text-gray-800 sm:text-[36px] sm:leading-[44px]">
                                Request Your Account
                            </h1>
                            <p className="text-sm text-gray-500">
                                Sign up in seconds to start managing and making
                                bookings effortlessly. With your Link2Pay
                                account, you&apos;ll gain access to real-time
                                availability, secure payment options, and a
                                user-friendly dashboard to track and manage all
                                your reservations in one place
                            </p>
                        </div>
                        <div>
                            <form
                                onSubmit={submit}
                                className="grid grid-cols-1 gap-6 space-y-4 md:grid-cols-2"
                            >
                                <div className="col-span-2 md:col-span-1">
                                    <div>
                                        <h3 className="font-bold underline">
                                            Company Information
                                        </h3>
                                    </div>
                                    <div className="space-y-4">
                                        <div>
                                            <Label
                                                htmlFor="hotel_name"
                                                required
                                            >
                                                Hotel/ Villa Name
                                            </Label>

                                            <Input
                                                id="hotel_name"
                                                name="hotel_name"
                                                type="text"
                                                defaultValue={data.hotel_name}
                                                onChange={(e) =>
                                                    setData(
                                                        'hotel_name',
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Enter your hotel/ villa name"
                                                className={
                                                    errors.hotel_name &&
                                                    'ring ring-red-500'
                                                }
                                            />
                                            <ValidationFeedback
                                                message={errors.hotel_name}
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="hotel_address">
                                                Address
                                            </Label>

                                            <Textarea
                                                id="hotel_address"
                                                name="hotel_address"
                                                defaultValue={
                                                    data.hotel_address
                                                }
                                                onChange={(e) =>
                                                    setData(
                                                        'hotel_address',
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Enter your hotel/ villa address"
                                                className={
                                                    errors.hotel_address &&
                                                    'ring ring-red-500'
                                                }
                                            />
                                            <ValidationFeedback
                                                message={errors.hotel_address}
                                            />
                                        </div>
                                        <div>
                                            <Label
                                                htmlFor="hotel_phone"
                                                required
                                            >
                                                Mobile Phone
                                            </Label>

                                            <Input
                                                id="hotel_phone"
                                                name="hotel_phone"
                                                type="number"
                                                defaultValue={data.hotel_phone}
                                                onChange={(e) =>
                                                    setData(
                                                        'hotel_phone',
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Enter your hotel/ villa mobile phone"
                                                className={
                                                    errors.hotel_phone &&
                                                    'ring ring-red-500'
                                                }
                                            />
                                            <ValidationFeedback
                                                message={errors.hotel_phone}
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="hotel_website">
                                                Website
                                            </Label>

                                            <Input
                                                id="hotel_website"
                                                name="hotel_website"
                                                type="text"
                                                defaultValue={
                                                    data.hotel_website
                                                }
                                                onChange={(e) =>
                                                    setData(
                                                        'hotel_website',
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Enter your hotel/ villa website"
                                                className={
                                                    errors.hotel_website &&
                                                    'ring ring-red-500'
                                                }
                                            />
                                            <ValidationFeedback
                                                message={errors.hotel_website}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="col-span-2 md:col-span-1">
                                    <div>
                                        <h3 className="font-bold underline">
                                            Personal Information
                                        </h3>
                                    </div>
                                    <div className="space-y-4">
                                        <div>
                                            <Label htmlFor="name" required>
                                                Name
                                            </Label>

                                            <Input
                                                id="name"
                                                name="name"
                                                type="text"
                                                defaultValue={data.name}
                                                onChange={(e) =>
                                                    setData(
                                                        'name',
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Enter your name"
                                                className={
                                                    errors.name &&
                                                    'ring ring-red-500'
                                                }
                                            />
                                            <ValidationFeedback
                                                message={errors.name}
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="email" required>
                                                Email
                                            </Label>

                                            <Input
                                                id="email"
                                                name="email"
                                                defaultValue={data.email}
                                                onChange={(e) =>
                                                    setData(
                                                        'email',
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Enter your email"
                                                className={
                                                    errors.email &&
                                                    'ring ring-red-500'
                                                }
                                            />
                                            <ValidationFeedback
                                                message={errors.email}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="col-span-2">
                                    <Button
                                        className="flex w-full items-center justify-center gap-2"
                                        type="submit"
                                        variant={'primary'}
                                        disabled={processing}
                                    >
                                        {processing && (
                                            <ArrowPathIcon className="size-5 animate-spin" />
                                        )}
                                        Send Request
                                    </Button>

                                    <Link
                                        href={route('auth.show-login-form')}
                                        className="mt-4 block w-full text-center text-sm text-gray-500 hover:text-blue-500"
                                    >
                                        Already have an account? Login
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </AuthLayout>
        </>
    )
}
