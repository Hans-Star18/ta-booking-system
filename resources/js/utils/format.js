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