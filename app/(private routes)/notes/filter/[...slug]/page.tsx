import { fetchNotes } from '@/lib/api/serverApi'
import NotesClient from './Notes.client'
import {
    dehydrate,
    HydrationBoundary,
    QueryClient,
} from '@tanstack/react-query'

import { Metadata } from 'next'

type Props = {
    params: Promise<{ slug: string[] }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params
    const tag = slug[0]
    return {
        title: `Notes:${tag}`,
        description: `You are looking at ${tag} notes`,
        openGraph: {
            title: `Notes:${tag}`,
            description: `Notes with this tag:${tag}`,
            url: `https://08-zustand-tau-kohl.vercel.app/notes/filter/${tag}`,
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

async function Notes({ params }: Props) {
    const { slug } = await params
    const tag = slug[0] === 'All' ? undefined : slug[0]
    const queryClient = new QueryClient()
    await queryClient.prefetchQuery({
        queryKey: ['notes', 1, '', tag],
        queryFn: () => fetchNotes('', 1, 9, tag),
    })
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NotesClient tag={tag} />
        </HydrationBoundary>
    )
}
export default Notes
