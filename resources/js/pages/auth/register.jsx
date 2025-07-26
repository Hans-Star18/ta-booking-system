import AuthLayout from '@/layouts/auth-layout'
import { Head, Link, useForm } from '@inertiajs/react'
import Label from '@/components/form/label'
import Input from '@/components/form/input'
import { ArrowPathIcon } from '@heroicons/react/24/outline'
import Button from '@/components/form/button'
import ValidationFeedback from '@/components/form/validation-feedback'

export default function Register() {
    const { data, setData, post, processing, errors } = useForm({
        hotel_name: '',
    })

    const submit = (e) => {
        e.preventDefault()
        // post(route('auth.login'), {
        //     onSuccess: () => {
        //         setData({
        //             email: '',
        //             password: '',
        //         })
        //     },
        //     onError: (errors) => {},
        //     preserveScroll: true,
        // })
    }

    return (
        <>
            <Head title="Register" />

            <AuthLayout>
                <div className="flex flex-1 flex-col">
                    <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center">
                        <div>
                            <div className="mb-5 sm:mb-8">
                                <h1 className="line mb-2 text-[30px] leading-[38px] font-semibold text-gray-800 sm:text-[36px] sm:leading-[44px]">
                                    Request Demo Account
                                </h1>
                            </div>
                            <div>
                                <form onSubmit={submit}>
                                    <div className="space-y-6">
                                        <div>
                                            <Label
                                                htmlFor="hotel_name"
                                                required={true}
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
                                                placeholder={
                                                    'Enter your hotel/ villa name'
                                                }
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
                                                href={route(
                                                    'auth.show-form-login'
                                                )}
                                                className="mt-4 block w-full text-center text-sm text-gray-500 hover:text-blue-500"
                                            >
                                                Already have an account? Sign in
                                            </Link>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </AuthLayout>
        </>
    )
}
