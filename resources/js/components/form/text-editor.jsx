import JoditEditor from 'jodit-react'
import { useRef } from 'react'

export default function TextEditor({ value, onChange, className }) {
    const editor = useRef(null)

    return (
        <JoditEditor
            ref={editor}
            value={value}
            onChange={onChange}
            className={className}
        />
    )
}
