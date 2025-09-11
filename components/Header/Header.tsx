import Link from 'next/link'
import css from './Header.module.css'
import TagsMenu from '../TagsMenu/TagsMenu'
import { getTags } from '@/lib/api/clientApi'
import AuthNavigation from '../AuthNavigation/AuthNavigation'

function Header() {
    const response = getTags()
    return (
        <header className={css.header}>
            <Link href="/" aria-label="Home">
                NoteHub
            </Link>
            <nav aria-label="Main Navigation" className={css.navigation}>
                <ul className={css.navigation}>
                    <li>
                        <Link href="/">Home</Link>
                    </li>
                    <li>
                        <TagsMenu tags={response}></TagsMenu>
                    </li>
                    <AuthNavigation />
                </ul>
            </nav>
        </header>
    )
}

export default Header
