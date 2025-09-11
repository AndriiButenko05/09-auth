// components/AuthNavigation/AuthNavigation.tsx

'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/lib/store/authStore'
import { logout } from '@/lib/api/clientApi'
import css from './AuthNavigation.module.css'

const AuthNavigation = () => {
    const router = useRouter()
    // Отримуємо поточну сесію та юзера
    const { isAuthenticated, user } = useAuthStore()
    // Отримуємо метод очищення глобального стану
    const clearIsAuthenticated = useAuthStore(
        (state) => state.clearIsAuthenticated
    )

    const handleLogout = async () => {
        // Викликаємо logout
        await logout()
        // Чистимо глобальний стан
        clearIsAuthenticated()
        // Виконуємо навігацію на сторінку авторизації
        router.push('/sign-in')
    }

    // Якщо є сесія - відображаємо кнопку Logout та інформацію про користувача
    // інакше - лінки для авторизації
    if (isAuthenticated) {
        return (
            <>
                <li className={css.navigationItem}>
                    <Link
                        href="/profile"
                        prefetch={false}
                        className={css.navigationLink}
                    >
                        Profile
                    </Link>
                </li>

                <li className={css.navigationItem}>
                    <p className={css.userEmail}>{user?.email}</p>
                    <button className={css.logoutButton} onClick={handleLogout}>
                        Logout
                    </button>
                </li>
            </>
        )
    }

    return (
        <>
            <li className={css.navigationItem}>
                <Link
                    href="/sign-in"
                    prefetch={false}
                    className={css.navigationLink}
                >
                    Login
                </Link>
            </li>

            <li className={css.navigationItem}>
                <Link
                    href="/sign-up"
                    prefetch={false}
                    className={css.navigationLink}
                >
                    Sign up
                </Link>
            </li>
        </>
    )
}

export default AuthNavigation
