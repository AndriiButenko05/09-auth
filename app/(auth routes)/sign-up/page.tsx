'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { useAuthStore } from '@/lib/store/authStore'

import { register } from '@/lib/api/clientApi'
import { RegisterRequest } from '@/types/auth'
import { AxiosError } from 'axios'
import css from './page.module.css'

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
            <h1 className={css.title}>Sign up</h1>

            <form action={handleSubmit} className={css.container}>
                <label className={css.label}>Email</label>{' '}
                <input
                    type="email"
                    name="email"
                    required
                    className={css.input}
                />
                <label className={css.label}>Password</label>{' '}
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
                    Register
                </button>
            </form>

            {error && <p className={css.title}>{error}</p>}
        </>
    )
}

export default SignUp
