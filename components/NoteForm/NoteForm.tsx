'use client'

import css from './NoteForm.module.css'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { CreateNote, createNote, getTags } from '../../lib/api'
import { useRouter } from 'next/navigation'
import { useNoteDraftStore } from '@/lib/store/noteStore'

export default function NoteForm() {
    const tags = getTags()
    const router = useRouter()
    const goBack = () => router.back()
    const { draft, setDraft, clearDraft } = useNoteDraftStore()
    const queryClient = useQueryClient()
    const handleChange = (
        event: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        setDraft({
            ...draft,
            [event.target.name]: event.target.value,
        })
    }
    const { mutate } = useMutation({
        mutationFn: createNote,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['notes'] })
            clearDraft()
            router.back()
        },
    })
    const handleSubmit = (formData: FormData) => {
        const values = Object.fromEntries(formData) as unknown as CreateNote
        mutate(values)
    }
    return (
        <form action={handleSubmit} className={css.form}>
            <div className={css.formGroup}>
                <label htmlFor="title">Title</label>
                <input
                    id="title"
                    type="text"
                    name="title"
                    className={css.input}
                    onChange={handleChange}
                    value={draft?.title}
                />
            </div>

            <div className={css.formGroup}>
                <label htmlFor="content">Content</label>
                <textarea
                    id="content"
                    name="content"
                    className={css.textarea}
                    onChange={handleChange}
                    value={draft?.content}
                />
            </div>

            <div className={css.formGroup}>
                <label htmlFor="tag">Tag</label>
                <select name="tag" value={draft?.tag} onChange={handleChange}>
                    {tags.map((tag) => (
                        <option key={tag} value={tag} defaultValue={draft?.tag}>
                            {tag}
                        </option>
                    ))}
                </select>
            </div>

            <div className={css.actions}>
                <button
                    type="button"
                    className={css.cancelButton}
                    onClick={goBack}
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className={css.submitButton}
                    disabled={false}
                >
                    Create note
                </button>
            </div>
        </form>
    )
}
