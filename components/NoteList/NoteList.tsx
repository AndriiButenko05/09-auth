import Link from 'next/link'
import { deleteNote } from '../../lib/api'
import type { Note } from '../../types/note'
import css from './NoteList.module.css'
import { useMutation, useQueryClient } from '@tanstack/react-query'

interface NoteListProps {
    notes: Note[]
}

export default function NoteList({ notes }: NoteListProps) {
    const queryClient = useQueryClient()

    const { mutate } = useMutation({
        mutationFn: deleteNote,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['notes'] })
        },
    })

    return (
        <ul className={css.list}>
            {notes.map((note) => (
                <li className={css.listItem} key={note.id}>
                    <h2 className={css.title}>{note.title}</h2>
                    <p className={css.content}>{note.content}</p>
                    <div className={css.footer}>
                        <span className={css.tag}>{note.tag}</span>
                        <Link href={`/notes/${note.id}`}>View Details</Link>
                        <button
                            className={css.button}
                            onClick={() => mutate(note.id)}
                        >
                            Delete
                        </button>
                    </div>
                </li>
            ))}
        </ul>
    )
}
