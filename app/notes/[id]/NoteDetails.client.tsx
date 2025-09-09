'use client'

import { useQuery } from '@tanstack/react-query'
import css from './NoteDetails.module.css'
import { getNoteById } from '@/lib/api'

interface NotePageClientProps {
    id: string
}

export default function NotePageClient({ id }: NotePageClientProps) {
    const { data, isLoading, error } = useQuery({
        queryKey: ['notes', id],
        queryFn: () => getNoteById(id),
        refetchOnMount: false,
    })
    if (isLoading) {
        return <p>Loading, please wait...</p>
    }
    if (error) {
        return <p>Something went wrong.</p>
    }
    return (
        <div className={css.container}>
            <div className={css.item}>
                <div className={css.header}>
                    <h2>{data?.title}</h2>
                </div>
                <p className={css.content}>{data?.content}</p>
                <p className={css.date}>{data?.createdAt}</p>
            </div>
        </div>
    )
}
