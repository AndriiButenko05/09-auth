'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { useAuthStore } from '@/lib/store/authStore'

import { register } from '@/lib/api/clientApi'
import { RegisterRequest } from '@/types/auth'
import { AxiosError } from 'axios'

type ApiError = AxiosError<{ error: string }>

const SignUp = () => {
    const router = useRouter()
    const [error, setError] = useState('')
    // Отримуємо метод із стора
    const setUser = useAuthStore((state) => state.setUser)

    const handleSubmit = async (formData: FormData) => {
        try {
            const formValues = Object.fromEntries(formData) as RegisterRequest
            const res = await register(formValues)
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
        <>
            <h1>Sign up</h1>
            <form action={handleSubmit}>
                <label>
                    Email
                    <input type="email" name="email" required />
                </label>
                <label>
                    Password
                    <input type="password" name="password" required />
                </label>
                <button type="submit">Register</button>
            </form>
            {error && <p>{error}</p>}
        </>
    )
}

export default SignUp
