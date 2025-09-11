import {
    dehydrate,
    HydrationBoundary,
    QueryClient,
} from '@tanstack/react-query'
import NotePageClient from './NoteDetails.client'

import { Metadata } from 'next'
import { getNoteById } from '@/lib/api/serverApi'

type Props = {
    params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params
    const note = await getNoteById(id)
    return {
        title: `${note.title}`,
        description: `${note.content}`,
        openGraph: {
            title: `${note.title}`,
            description: `${note.content}`,
            url: `https://08-zustand-tau-kohl.vercel.app/notes/${id}`,
            images: [
                {
                    url: 'https://placehold.co/1200x630',
                    width: 1200,
                    height: 630,
                    alt: 'NoteHub',
                },
            ],
        },
    }
}

export default async function NotePage({ params }: Props) {
    const { id } = await params
    const queryClient = new QueryClient()
    await queryClient.prefetchQuery({
        queryKey: ['notes', id],
        queryFn: () => getNoteById(id),
    })
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NotePageClient id={id} />
        </HydrationBoundary>
    )
}
