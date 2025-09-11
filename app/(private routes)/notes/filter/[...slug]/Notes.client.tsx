'use client'
import { useState } from 'react'
import { useQuery, keepPreviousData } from '@tanstack/react-query'
import css from './Notes.module.css'
import NoteList from '@/components/NoteList/NoteList'
import Pagination from '@/components/Pagination/Pagination'
import SearchBox from '@/components/SearchBox/SearchBox'

import { useDebounce } from 'use-debounce'
import Link from 'next/link'
import { fetchNotesClient } from '@/lib/api/clientApi'

interface NotesClientProps {
    tag?: string
}

export default function NotesClient({ tag }: NotesClientProps) {
    const [currentPage, setCurrentPage] = useState(1)
    const [text, setText] = useState('')
    const [debouncedSearchedQuery] = useDebounce(text, 500)
    const { data, isLoading, isError } = useQuery({
        queryKey: ['notes', currentPage, debouncedSearchedQuery, tag],
        queryFn: () =>
            fetchNotesClient(debouncedSearchedQuery, currentPage, 9, tag),
        placeholderData: keepPreviousData,
        refetchOnMount: false,
    })
    const handleChange = (value: string) => {
        setCurrentPage(1)
        setText(value)
    }
    const totalPages = data?.totalPages || 0
    return (
        <>
            <div className={css.app}>
                <header className={css.toolbar}>
                    {<SearchBox onChange={handleChange} value={text} />}
                    {totalPages > 1 && (
                        <Pagination
                            totalPages={totalPages}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                        />
                    )}
                    {
                        <Link
                            className={css.button}
                            href="/notes/action/create"
                        >
                            Create note +
                        </Link>
                    }
                </header>
                {isError && <p>Something went wrong...</p>}
                {isLoading && <p>Loading...</p>}
                {data && data.notes.length !== 0 && (
                    <NoteList notes={data.notes} />
                )}
            </div>
        </>
    )
}
