import {
    SidebarProvider,
    useSidebar,
} from '@/components/context/siderbar-context'
import OrganizerHeader from '@/components/header/organizer-header'
import OrganizerSidebar from '@/components/sidebar/organizer-sidebar'

export default function OrganizerLayout({ children }) {
    return (
        <SidebarProvider>
            <OrganizerLayoutContent>{children}</OrganizerLayoutContent>
        </SidebarProvider>
    )
}

function OrganizerLayoutContent({ children }) {
    const { isExpanded, isHovered, isMobileOpen } = useSidebar()

    return (
        <div className="min-h-screen xl:flex">
            <div>
                <OrganizerSidebar />
            </div>
            <div
                className={`flex-1 transition-all duration-300 ease-in-out ${
                    isExpanded || isHovered ? 'lg:ml-[250px]' : 'lg:ml-[80px]'
                } ${isMobileOpen ? 'ml-0' : ''}`}
            >
                <OrganizerHeader />
                <div className="px-6 lg:px-10">
                    <div className="container m-auto pt-10">{children}</div>
                </div>
            </div>
        </div>
    )
}
