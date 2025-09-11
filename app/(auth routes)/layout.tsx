'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

type Props = {
    children: React.ReactNode
}

export default function PublicLayout({ children }: Props) {
    const [loading, setLoading] = useState(true)

    const router = useRouter()

    useEffect(() => {
        router.refresh()
        setLoading(false)
    }, [router])

    return <>{loading ? <div>Loading...</div> : children}</>
}
