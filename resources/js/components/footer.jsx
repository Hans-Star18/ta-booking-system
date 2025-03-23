export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <div className="py-8">
            <p className="text-md text-gray-500 text-center">
                Copyright &copy; {year} All rights reserved.
            </p>
        </div>
    );
}
