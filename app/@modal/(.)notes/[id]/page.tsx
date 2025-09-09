import { getNoteById } from '@/lib/api'

import NotePreview from './NotePreview.client'
import {
    dehydrate,
    HydrationBoundary,
    QueryClient,
} from '@tanstack/react-query'
type Props = {
    params: Promise<{ id: string }>
}

const SingleNotePreview = async ({ params }: Props) => {
    const { id } = await params

    const queryClient = new QueryClient()
    await queryClient.prefetchQuery({
        queryKey: ['notes', id],
        queryFn: () => getNoteById(id),
    })

    return (
        <>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <NotePreview id={id}></NotePreview>
            </HydrationBoundary>
        </>
    )
}

export default SingleNotePreview
