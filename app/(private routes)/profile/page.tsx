// app/(private routes)/profile/page.tsx

import Link from 'next/link'
import { getServerMe } from '@/lib/api/serverApi'
import Image from 'next/image'
import { Metadata } from 'next'
import css from './Profile.module.css'

export const metadata: Metadata = {
    title: 'Your Profile on NoteHub',
    description: 'Personal profile for making notes',
    openGraph: {
        title: 'Your Profile on NoteHub',
        description: 'Personal profile for making notes',
        images: [
            {
                url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
                width: 1200,
                height: 630,
                alt: 'Note Hub Logo',
            },
        ],
    },
}

const Profile = async () => {
    const user = await getServerMe()

    return (
        <section className={css.container}>
            <div>
                <h1 className={css.title}>My Profile</h1>
            </div>{' '}
            <Link href="/profile/edit" className={css.edit}>
                Edit profile
            </Link>
            <div>
                <Image
                    src="https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"
                    alt="User Avatar"
                    width={200}
                    height={200}
                />
            </div>
            <div>
                <h2 className={css.text}>Name: {user.username}</h2>
                <h2 className={css.text}>Email: {user.email}</h2>
                <p className={css.text}>Information about: {user.username}</p>
            </div>
        </section>
    )
}

export default Profile
