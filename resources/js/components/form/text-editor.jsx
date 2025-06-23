import JoditEditor from 'jodit-react'
import { useRef } from 'react'

export default function TextEditor({ defaultValue, onChange, className }) {
    const editor = useRef(null)

    return (
        <JoditEditor
            ref={editor}
            defaultValue={defaultValue}
            onChange={onChange}
            className={className}
        />
    )
}
