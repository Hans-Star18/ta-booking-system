import Toast from '@/components/alert/toast'
import {
    SidebarProvider,
    useSidebar,
} from '@/components/context/siderbar-context'
import AdminHeader from '@/components/header/admin-header'
import AdminSidebar from '@/components/sidebar/admin-sidebar'
import { usePage } from '@inertiajs/react'
import { useEffect, useState } from 'react'

export default function AdminLayout({ children }) {
    return (
        <SidebarProvider>
            <AdminLayoutContent>{children}</AdminLayoutContent>
        </SidebarProvider>
    )
}

function AdminLayoutContent({ children }) {
    const { isExpanded, isHovered, isMobileOpen } = useSidebar()
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

            <div className="min-h-screen xl:flex">
                <div>
                    <AdminSidebar />
                </div>
                <div
                    className={`flex-1 transition-all duration-300 ease-in-out ${
                        isExpanded || isHovered
                            ? 'lg:ml-[250px]'
                            : 'lg:ml-[80px]'
                    } ${isMobileOpen ? 'ml-0' : ''}`}
                >
                    <AdminHeader />
                    <div className="container m-auto bg-gray-50 p-4">
                        {children}
                    </div>
                </div>
            </div>
        </>
    )
}
