import ArrowRotateLeftIcon from '@/components/icons/arrow-rotate-left-icon'
import SmokingIcon from '@/components/icons/smoking-icon'
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline'

const getPolicyIcon = (policy, isIncluded) => {
    if (!isIncluded) {
        return <XMarkIcon className="size-4 text-red-500" />
    }

    const policyName = policy.name.toLowerCase()
    if (policyName.includes('refundable')) {
        return <ArrowRotateLeftIcon className="size-4 text-amber-500" />
    }
    if (policyName.includes('smoking')) {
        return <SmokingIcon className="size-4 text-amber-500" />
    }
    return <CheckIcon className="size-4 text-amber-500" />
}

export default function PolicyList({ policies, roomPolicies, icon = true }) {
    return policies.map((policy) => {
        const isIncluded = roomPolicies.some((rp) => rp.id === policy.id)
        return (
            <div key={policy.id} className="flex items-center gap-1">
                {icon && getPolicyIcon(policy, isIncluded)}
                <span
                    className={isIncluded ? 'text-amber-500' : 'text-red-500'}
                >
                    {isIncluded ? '' : 'No-'}
                    {policy.name}
                </span>
            </div>
        )
    })
}
