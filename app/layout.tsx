import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header/Header'
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider'
import Footer from '@/components/Footer/Footer'
import AuthProvider from '@/components/AuthProvider/AuthProvider'

const roboto = Roboto({
    variable: '--font-roboto',
    subsets: ['latin'],
    weight: ['400', '700'],
    display: 'swap',
})

export const metadata: Metadata = {
    title: 'NoteHub',
    description: 'Explore your notes',
    openGraph: {
        title: `NoteHub`,
        description: 'Explore your notes',
        url: `https://08-zustand-tau-kohl.vercel.app`,
        siteName: 'NoteHub',
        images: [
            {
                url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
                width: 1200,
                height: 630,
                alt: 'NoteHub',
            },
        ],
        type: 'website',
    },
}

export default function RootLayout({
    children,
    modal,
}: Readonly<{
    children: React.ReactNode
    modal: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body className={`${roboto.variable}`}>
                <TanStackProvider>
                    <AuthProvider>
                        <Header />
                        <main>
                            {children}
                            {modal}
                        </main>
                        <Footer />
                    </AuthProvider>
                </TanStackProvider>
            </body>
        </html>
    )
}
