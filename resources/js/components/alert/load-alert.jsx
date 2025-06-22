import { usePage } from '@inertiajs/react'
import { useEffect, useState } from 'react'

export default function LoadAlert() {
    const [alert, setAlert] = useState(null)
    const { alert: flashAlert } = usePage().props

    useEffect(() => {
        if (flashAlert) {
            setAlert(flashAlert)
        }
    }, [flashAlert?._id])

    return alert
}
