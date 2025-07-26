import { use, useEffect, useState } from 'react'
import AuthLayout from '@/layouts/auth-layout'
import { Head, useForm } from '@inertiajs/react'
import Label from '@/components/form/label'
import Input from '@/components/form/input'
import {
    ArrowPathIcon,
    EyeIcon,
    EyeSlashIcon,
} from '@heroicons/react/24/outline'
import Button from '@/components/form/button'
import ValidationFeedback from '@/components/form/validation-feedback'

export default function Login() {
    const [showPassword, setShowPassword] = useState(false)

    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    })

    const submit = (e) => {
        e.preventDefault()
        post(route('auth.login'), {
            onSuccess: () => {
                setData({
                    email: '',
                    password: '',
                })
            },
            onError: (errors) => {},
            preserveScroll: true,
        })
    }

    return (
        <>
            <Head title="Login" />

            <AuthLayout>
                <div className="flex flex-1 flex-col">
                    <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center">
                        <div>
                            <div className="mb-5 sm:mb-8">
                                <h1 className="line mb-2 text-[30px] leading-[38px] font-semibold text-gray-800 sm:text-[36px] sm:leading-[44px]">
                                    Sign In
                                </h1>
                                <p className="text-sm text-gray-500">
                                    Enter your email and password to sign in!
                                </p>
                            </div>
                            <div>
                                <form onSubmit={submit}>
                                    <div className="space-y-6">
                                        <div>
                                            <Label
                                                htmlFor={'email'}
                                                required={true}
                                            >
                                                Email
                                            </Label>

                                            <Input
                                                id={'email'}
                                                name={'email'}
                                                type={'email'}
                                                defaultValue={data.email}
                                                onChange={(e) =>
                                                    setData(
                                                        'email',
                                                        e.target.value
                                                    )
                                                }
                                                placeholder={'Enter your email'}
                                                className={
                                                    errors.email &&
                                                    'ring ring-red-500'
                                                }
                                            />
                                            <ValidationFeedback
                                                message={errors.email}
                                            />
                                        </div>
                                        <div>
                                            <Label
                                                htmlFor={'password'}
                                                required={true}
                                            >
                                                Password
                                            </Label>
                                            <div className="relative">
                                                <Input
                                                    id={'password'}
                                                    name={'password'}
                                                    type={
                                                        showPassword
                                                            ? 'text'
                                                            : 'password'
                                                    }
                                                    defaultValue={data.password}
                                                    onChange={(e) =>
                                                        setData(
                                                            'password',
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder="Enter your password"
                                                    className={
                                                        errors.password &&
                                                        'ring ring-red-500'
                                                    }
                                                />

                                                <span
                                                    onClick={() =>
                                                        setShowPassword(
                                                            !showPassword
                                                        )
                                                    }
                                                    className="absolute top-1/2 right-4 z-30 -translate-y-1/2 cursor-pointer"
                                                >
                                                    {showPassword ? (
                                                        <EyeIcon className="size-5 text-gray-500" />
                                                    ) : (
                                                        <EyeSlashIcon className="size-5 text-gray-500" />
                                                    )}
                                                </span>
                                            </div>
                                            <ValidationFeedback
                                                message={errors.password}
                                            />
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="relative h-5 w-5">
                                                    <input
                                                        type="checkbox"
                                                        className="h-5 w-5 cursor-pointer appearance-none rounded-md border border-gray-300 checked:border-transparent checked:bg-blue-500 disabled:opacity-60"
                                                        checked={data.remember}
                                                        onChange={() =>
                                                            setData(
                                                                'remember',
                                                                !data.remember
                                                            )
                                                        }
                                                    />
                                                    {data.remember && (
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            strokeWidth={3}
                                                            stroke="currentColor"
                                                            className="pointer-events-none absolute top-1/2 left-1/2 size-4 -translate-x-1/2 -translate-y-1/2 transform text-gray-300"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="m4.5 12.75 6 6 9-13.5"
                                                            />
                                                        </svg>
                                                    )}
                                                </div>
                                                <span className="text-theme-sm block font-normal text-gray-700">
                                                    Keep me logged in
                                                </span>
                                            </div>
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
                                                Login
                                            </Button>

                                            <Link
                                                href={route(
                                                    'auth.request-demo-account'
                                                )}
                                                className="mt-4 block w-full text-center text-sm text-gray-500 hover:text-blue-500"
                                            >
                                                Don't have an account? request
                                                demo account
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
