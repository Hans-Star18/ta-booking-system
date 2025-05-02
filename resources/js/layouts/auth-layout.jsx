import Toast from '@/components/alert/toast'
import { usePage } from '@inertiajs/react'
import { useEffect, useState } from 'react'

export default function AuthLayout({ children }) {
    const [alert, setAlert] = useState(null)
    const { alert: flashAlert } = usePage().props

    useEffect(() => {
        if (flashAlert) {
            setAlert(flashAlert)
        }
    }, [flashAlert?._id])

    return (
        <>
            {alert && (
                <Toast
                    message={alert.message}
                    type={alert.type}
                    id={alert._id}
                />
            )}
            <div className="flex h-screen w-full flex-col justify-center p-6">
                {children}
            </div>
        </>
    )
}
