import OrganizerHeader from '@/components/header/organizer-header'

export default function OrganizerLayout({ children }) {
    return (
        <>
            <OrganizerHeader />

            <div className="px-6 lg:px-10">
                <div className="container m-auto pt-10"></div>
            </div>
        </>
    )
}
