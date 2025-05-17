import Swal from 'sweetalert2'

export default function BasicAlert({ title, text, icon = 'success' }) {
    Swal.fire({
        title: title,
        text: text,
        icon: icon,
        confirmButtonText: 'OK',
    })
}
