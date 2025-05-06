import Swal from 'sweetalert2'

export default function Confirm({ action, onConfirm }) {
    const handleConfirm = () => {
        switch (action) {
            case 'delete':
                Swal.fire({
                    title: 'Are you sure you want to delete this?',
                    text: 'This data will be deleted permanently.',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#d33',
                    cancelButtonColor: '#3085d6',
                    confirmButtonText: 'Yes, delete it!',
                }).then((result) => {
                    if (result.isConfirmed) {
                        onConfirm()
                    }
                })
                break
            case 'edit':
                Swal.fire({
                    title: 'Are you sure you want to edit?',
                    text: 'Changes will be saved.',
                    icon: 'info',
                    showCancelButton: true,
                    confirmButtonText: 'Yes, edit it!',
                    cancelButtonText: 'Cancel',
                }).then((result) => {
                    if (result.isConfirmed) {
                        onConfirm()
                    }
                })
                break
            default:
                console.warn('Unknown action:', action)
        }
    }

    return handleConfirm()
}
