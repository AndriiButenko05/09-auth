// app/(private routes)/profile/edit/page.tsx

'use client'

import { useEffect, useState } from 'react'
import AvatarPicker from '@/components/AvatarPicker/AvatarPicker'
import { getMe, updateMe, uploadImage } from '@/lib/api/clientApi'

const EditProfile = () => {
    const [userName, setUserName] = useState('')
    const [photoUrl, setPhotoUrl] = useState('')
    const [imageFile, setImageFile] = useState<File | null>(null)

    useEffect(() => {
        getMe().then((user) => {
            setUserName(user.username ?? '')
            setPhotoUrl(user.avatar ?? '')
        })
    }, [])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserName(event.target.value)
    }

    const handleSaveUser = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        try {
            const newPhotoUrl = imageFile ? await uploadImage(imageFile) : ''
            await updateMe({ userName, photoUrl: newPhotoUrl })
        } catch (error) {
            console.error('Oops, some error:', error)
        }
    }
    return (
        <div>
            <h1>Edit profile</h1>
            <br />
            <AvatarPicker
                profilePhotoUrl={photoUrl}
                onChangePhoto={setImageFile}
            />
            <br />
            <form onSubmit={handleSaveUser}>
                <input type="text" value={userName} onChange={handleChange} />
                <br />
                <button type="submit">Save user</button>
            </form>
        </div>
    )
}

export default EditProfile
