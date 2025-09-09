import axios from 'axios'
import type { Note } from '../types/note'
axios.defaults.headers.common['Authorization'] = `Bearer ${
    process.env.NEXT_PUBLIC_NOTEHUB_TOKEN
}`

interface FetchNotes {
    notes: Note[]
    totalPages: number
}

export async function fetchNotes(
    page: number,
    query?: string,
    tag?:string
): Promise<FetchNotes> {
    const response = await axios.get<FetchNotes>(
        `https://notehub-public.goit.study/api/notes`,
        {
            params: {
                page,
                perPage: 12,
                ...(query ? { search: query } : {}),
                  ...(tag ? { tag } : {}),
            },
        }
    )
    return response.data
}

export interface CreateNote {
    title: string
    content: string
    tag: string
}

export async function createNote(note: CreateNote): Promise<Note> {
    const response = await axios.post<Note>(
        `https://notehub-public.goit.study/api/notes`,
        note
    )
    return response.data
}

export async function deleteNote(id: string): Promise<Note> {
    const response = await axios.delete<Note>(
        `https://notehub-public.goit.study/api/notes/${id}`
    )
    return response.data
}

export async function getNoteById(id: string): Promise<Note> {
    const response = await axios.get<Note>(
        `https://notehub-public.goit.study/api/notes/${id}`
    )
    return response.data
}

export const getTags = (): string[] => {
return ["Work", "Personal", "Meeting", "Shopping", "Todo"];
};