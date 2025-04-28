import { twMerge } from 'tailwind-merge'

export default function FileInput({ id, name, className, onChange }) {
    return (
        <input
            id={id}
            name={name}
            type="file"
            className={twMerge(
                'h-11 w-full overflow-hidden rounded-lg border border-gray-300 bg-transparent text-sm text-gray-500 transition-colors file:mr-5 file:border-collapse file:cursor-pointer file:rounded-l-lg file:border-0 file:border-r file:border-solid file:border-gray-200 file:bg-gray-50 file:py-3 file:pr-3 file:pl-3.5 file:text-sm file:text-gray-700 placeholder:text-gray-400 hover:file:bg-gray-100 focus:ring-blue-300 focus:outline-hidden focus:file:ring-blue-300',
                className
            )}
            onChange={onChange}
        />
    )
}
