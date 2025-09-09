'use client'
import css from './TagsMenu.module.css'
import { useState } from 'react'
import Link from 'next/link'

type Props = {
    tags: string[]
}

export default function TagsMenu({ tags }: Props) {
    const [isOpen, setIsOpen] = useState(false)
    const toggle = () => setIsOpen(!isOpen)

    return (
        <div className={css.menuContainer}>
            <button className={css.menuButton} onClick={toggle}>
                Notes ▾
            </button>
            {isOpen && (
                <ul className={css.menuList}>
                    <li className={css.menuItem}>
                        <Link href={`/notes/filter/All`} onClick={toggle}>
                            All
                        </Link>
                    </li>
                    {tags.map((tag) => (
                        <li key={tag} className={css.menuItem}>
                            <Link
                                href={`/notes/filter/${tag}`}
                                onClick={toggle}
                            >
                                {tag}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}
