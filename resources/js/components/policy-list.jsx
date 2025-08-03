import ArrowRotateLeftIcon from '@/components/icons/arrow-rotate-left-icon'
import SmokingIcon from '@/components/icons/smoking-icon'
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { twMerge } from 'tailwind-merge'

const getPolicyIcon = (policy, isIncluded) => {
    if (!isIncluded) {
        return <XMarkIcon className="size-3 text-red-500" />
    }

    const policyName = policy.name.toLowerCase()
    if (policyName.includes('refundable')) {
        return <ArrowRotateLeftIcon className="size-3 text-green-500" />
    }
    if (policyName.includes('smoking')) {
        return <SmokingIcon className="size-3 text-green-500" />
    }
    return <CheckIcon className="size-3 text-green-500" />
}

export default function PolicyList({ policies, roomPolicies, icon = true }) {
    return policies.map((policy) => {
        const isIncluded = roomPolicies.some((rp) => rp.id === policy.id)
        return (
            <div
                key={policy.id}
                className={twMerge(
                    'flex items-center gap-1 rounded-md border px-2 py-1 text-xs',
                    isIncluded ? 'border-green-500' : 'border-red-500'
                )}
            >
                {icon && getPolicyIcon(policy, isIncluded)}
                <span
                    className={isIncluded ? 'text-green-500' : 'text-red-500'}
                >
                    {isIncluded ? '' : 'No-'}
                    {policy.name}
                </span>
            </div>
        )
    })
}
