import { create } from 'zustand'
import { CreateNote } from '../api'
import { persist } from 'zustand/middleware'

type NoteDraftStore = {
    draft: CreateNote
    setDraft: (note: CreateNote) => void
    clearDraft: () => void
}

const initialDraft: CreateNote = {
    title: '',
    content: '',
    tag: 'Todo',
}

export const useNoteDraftStore = create<NoteDraftStore>()(
    persist(
        (set) => ({
            draft: initialDraft,
            setDraft: (note) =>
                set((state) => ({
                    draft: { ...state.draft, ...note },
                })),
            clearDraft: () => set({ draft: initialDraft }),
        }),
        {
            name: 'note-draft',
            partialize: (state) => ({ draft: state.draft }),
        }
    )
)
