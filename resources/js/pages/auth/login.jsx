import { useState } from "react";
import AuthLayout from "@/layouts/auth-layout";
import { Head } from "@inertiajs/react";
import Label from "@/components/form/label";
import Input from "@/components/form/input";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [isChecked, setIsChecked] = useState(false);

    return (
        <>
            <Head title="Login" />

            <AuthLayout>
                <div className="flex flex-col flex-1">
                    <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
                        <div>
                            <div className="mb-5 sm:mb-8">
                                <h1 className="mb-2 font-semibold text-gray-800 text-[30px] leading-[38px] line sm:text-[36px] sm:leading-[44px]">
                                    Sign In
                                </h1>
                                <p className="text-sm text-gray-500">
                                    Enter your email and password to sign in!
                                </p>
                            </div>
                            <div>
                                <form>
                                    <div className="space-y-6">
                                        <div>
                                            <Label
                                                htmlFor={"email"}
                                                required={true}
                                            >
                                                Email
                                            </Label>

                                            <Input
                                                id={"email"}
                                                name={"email"}
                                                type={"email"}
                                                placeholder={"Enter your email"}
                                            />
                                        </div>
                                        <div>
                                            <Label
                                                htmlFor={"password"}
                                                required={true}
                                            >
                                                Password
                                            </Label>
                                            <div className="relative">
                                                <Input
                                                    id={"password"}
                                                    name={"password"}
                                                    type={
                                                        showPassword
                                                            ? "text"
                                                            : "password"
                                                    }
                                                    placeholder="Enter your password"
                                                />

                                                <span
                                                    onClick={() =>
                                                        setShowPassword(
                                                            !showPassword,
                                                        )
                                                    }
                                                    className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                                                >
                                                    {showPassword ? (
                                                        <EyeIcon className="size-5 text-gray-500" />
                                                    ) : (
                                                        <EyeSlashIcon className="size-5 text-gray-500" />
                                                    )}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="relative w-5 h-5">
                                                    <input
                                                        type="checkbox"
                                                        className="w-5 h-5 appearance-none cursor-pointer border border-gray-300 checked:border-transparent rounded-md checked:bg-blue-500 disabled:opacity-60"
                                                        checked={isChecked}
                                                        onChange={() =>
                                                            setIsChecked(
                                                                !isChecked,
                                                            )
                                                        }
                                                    />
                                                    {isChecked && (
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            strokeWidth={3}
                                                            stroke="currentColor"
                                                            className="absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-none top-1/2 left-1/2 size-4 text-gray-300"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="m4.5 12.75 6 6 9-13.5"
                                                            />
                                                        </svg>
                                                    )}
                                                </div>
                                                <span className="block font-normal text-gray-700 text-theme-sm">
                                                    Keep me logged in
                                                </span>
                                            </div>
                                        </div>
                                        <div>
                                            <button className="w-full bg-blue-500 text-white shadow-xs hover:bg-blue-600 inline-flex items-center justify-center gap-2 rounded-lg transition px-4 py-3 text-sm">
                                                Login
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </AuthLayout>
        </>
    );
}
