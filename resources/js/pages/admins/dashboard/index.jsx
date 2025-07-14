import AdminLayout from '@/layouts/admin-layout'
import { Head } from '@inertiajs/react'

export default function Index() {
    return (
        <>
            <Head title="Admin Dashboard" />

            <AdminLayout>
                <div className="rounded-2xl border border-gray-200 bg-white p-4 md:p-6">
                    <div className="mb-4 flex items-center justify-between">
                        <h1 className="text-2xl font-bold">Dashboard</h1>
                    </div>

                    <div className="max-w-[1200px] overflow-x-auto">
                        <h1>Hello World</h1>
                    </div>
                </div>
            </AdminLayout>
        </>
    )
}
