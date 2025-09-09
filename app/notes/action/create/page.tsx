import { Metadata } from 'next'
import css from './page.module.css'
import NoteForm from '@/components/NoteForm/NoteForm'

export function generateMetadata(): Metadata {
    return {
        title: `Create Note`,
        description: `Create New Note`,
        openGraph: {
            title: `Create Note`,
            description: `Create New Note`,
            url: 'https://08-zustand-tau-kohl.vercel.app/notes/action/create',
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

export default function Page() {
    return (
        <main className={css.main}>
            <div className={css.container}>
                <h1 className={css.title}>Create note</h1>
                {<NoteForm></NoteForm>}
            </div>
        </main>
    )
}
