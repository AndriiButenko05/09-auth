// app/(public routes)/sign-in/page.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { useAuthStore } from '@/lib/store/authStore'
import { ApiError } from '@/app/api/api'
import { login, LoginRequest } from '@/lib/api/clientApi'

const SignIn = () => {
    const router = useRouter()
    const [error, setError] = useState('')
    // Отримуємо метод із стора
    const setUser = useAuthStore((state) => state.setUser)

    const handleSubmit = async (formData: FormData) => {
        try {
            const formValues = Object.fromEntries(formData) as LoginRequest
            const res = await login(formValues)
            if (res) {
                // Записуємо користувача у глобальний стан
                setUser(res)
                router.push('/profile')
            } else {
                setError('Invalid email or password')
            }
        } catch (error) {
            setError(
                (error as ApiError).response?.data?.error ??
                    (error as ApiError).message ??
                    'Oops... some error'
            )
        }
    }

    return (
        <form action={handleSubmit}>
            <h1>Sign in</h1>
            <label>
                Email
                <input type="email" name="email" required />
            </label>
            <label>
                Password
                <input type="password" name="password" required />
            </label>
            <button type="submit">Log in</button>
            {error && <p>{error}</p>}
        </form>
    )
}

export default SignIn
