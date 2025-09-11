// app/(private routes)/profile/page.tsx

import Link from 'next/link'
import { getServerMe } from '@/lib/api/serverApi'
import Image from 'next/image'
import { Metadata } from 'next'

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
        <section>
            <div>
                <h1>My Profile</h1>
                <Link href="/profile/edit">Edit profile</Link>
            </div>
            <div>
                <Image
                    src="https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"
                    alt="User Avatar"
                    width={150}
                    height={150}
                />
            </div>
            <div>
                <h2>Name: {user.username}</h2>
                <h2>Email: {user.email}</h2>
                <p>Information about: {user.username}</p>
            </div>
        </section>
    )
}

export default Profile
