export default function Footer() {
    const year = new Date().getFullYear()

    return (
        <div className="py-8">
            <p className="text-md text-center text-gray-500">
                Copyright &copy; {year} All rights reserved.
            </p>
        </div>
    )
}
