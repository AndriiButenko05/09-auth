'use client'
import css from './NotePreview.module.css'
import Modal from '@/components/Modal/Modal'
import { useRouter } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { getNoteById } from '@/lib/api/clientApi'

interface NotePreviewProps {
    id: string
}

export default function NotePreview({ id }: NotePreviewProps) {
    const router = useRouter()
    const { data } = useQuery({
        queryKey: ['notes', id],
        queryFn: () => getNoteById(id),
        refetchOnMount: false,
    })

    const close = () => router.back()
    return (
        <Modal onClose={close}>
            <div className={css.item}>
                <button onClick={close} className={css.backBtn}>
                    Close
                </button>
                <h2 className={`${css.header} ${css.h2}`}>{data?.title}</h2>
                <p className={css.content}>{data?.content}</p>
                <p className={css.date}>Created:{data?.createdAt}</p>
                <p className={css.date}>Updated: {data?.updatedAt}</p>
                <p className={css.tag}>{data?.tag}</p>
            </div>
        </Modal>
    )
}
