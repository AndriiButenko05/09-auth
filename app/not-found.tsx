import { Metadata } from 'next'
import css from './page.module.css'

export const metadata: Metadata = {
    title: 'NotFound',
    description: 'NotFound page',
    openGraph: {
        title: `NotFound`,
        description: 'NotFound page',
        url: `https://08-zustand-ten-ochre.vercel.app/not-found`,
        images: [
            {
                url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
                width: 1200,
                height: 630,
                alt: 'NoteHub',
            },
        ],
    },
}

const NotFoundPage = () => {
    return (
        <>
            <h1 className={css.title}>404 - Page not found</h1>
            <p className={css.description}>
                Sorry, the page you are looking for does not exist.
            </p>
        </>
    )
}

export default NotFoundPage
