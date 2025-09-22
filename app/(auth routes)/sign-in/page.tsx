// app/(public routes)/sign-in/page.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { useAuthStore } from '@/lib/store/authStore'

import { login } from '@/lib/api/clientApi'
import { LoginRequest } from '@/types/auth'
import { AxiosError } from 'axios'
import css from './page.module.css'

type ApiError = AxiosError<{ error: string }>

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
            <h1 className={css.title}>Sign in</h1>
            <div className={css.container}>
                <label className={css.label}>Email</label>
                <input
                    type="email"
                    name="email"
                    required
                    className={css.input}
                />
                <label className={css.label}>Password</label>
                <input
                    type="password"
                    name="password"
                    required
                    className={css.input}
                />
                <button
                    type="submit"
                    className={`${css.customBtn} ${css.btn2}`}
                >
                    Log in
                </button>
            </div>

            {error && <p className={css.title}>{error}</p>}
        </form>
    )
}

export default SignIn
