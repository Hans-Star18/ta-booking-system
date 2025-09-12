export const formatWebsiteUrl = (url) => {
    if (!url) return ''
    if (url.startsWith('http://') || url.startsWith('https://')) {
        return url
    }
    return `https://${url}`
}

export const formatEmailUrl = (email) => {
    if (!email) return ''
    if (email.startsWith('mailto:')) {
        return email
    }
    return `mailto:${email}`
}

export const formatDate = (date) => {
    if (!date) return ''
    return new Date(date).toLocaleDateString('en-Us', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    })
}

export const formatDateTime = (date) => {
    if (!date) return ''
    return new Date(date).toLocaleDateString('id-ID', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    })
}
