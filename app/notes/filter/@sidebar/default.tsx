import { getTags } from '@/lib/api'
import css from './Sidebar.module.css'
import Link from 'next/link'
export default function Sidebar() {
    const tags = getTags()
    return (
        <ul className={css.menuList}>
            <li className={css.menuItem}>
                <Link href={`/notes/filter/All`} className={css.menuLink}>
                    All
                </Link>
            </li>
            {tags.map((tag) => (
                <li key={tag} className={css.menuItem}>
                    <Link
                        href={`/notes/filter/${tag}`}
                        className={css.menuLink}
                    >
                        {tag}
                    </Link>
                </li>
            ))}
        </ul>
    )
}
