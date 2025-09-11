import { Note } from '@/types/note'
import { nextServer } from './api'
import { isAxiosError } from 'axios'
import { User } from '@/types/user'
import { LoginRequest, RegisterRequest } from '@/types/auth'

export interface CreateNote {
    title: string
    content: string
    tag: string
}

export const getTags = (): string[] => {
    return ['Work', 'Personal', 'Meeting', 'Shopping', 'Todo']
}

export async function createNote(note: CreateNote) {
    try {
        const { data } = await nextServer.post<Note>('/notes', note)
        return data
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Error(
                error.response?.data?.message || 'Creating note failed'
            )
        }
        throw new Error('Creating note failed')
    }
}

export async function deleteNoteClient(id: string): Promise<Note> {
    try {
        const { data } = await nextServer.delete<Note>(`/notes/${id}`)
        return data
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Error(
                error.response?.data?.message || 'Deleting note failed'
            )
        }
        throw new Error('Deleting note failed')
    }
}

export async function getNoteById(id: string): Promise<Note> {
    try {
        const { data } = await nextServer.get<Note>(`/notes/${id}`)
        return data
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Error(
                error.response?.data?.message || 'Fetching note failed'
            )
        }
        throw new Error('Fetching note failed')
    }
}

export const updateMe = async (payload: string) => {
    const res = await nextServer.patch<User>('/users/me', payload)
    return res.data
}

export const getMe = async () => {
    const { data } = await nextServer.get<User>('/users/me')
    return data
}
export const uploadImage = async (file: File): Promise<string> => {
    const formData = new FormData()
    formData.append('file', file)
    const { data } = await nextServer.post('/upload', formData)
    return data.url
}

export const register = async (data: RegisterRequest) => {
    const res = await nextServer.post<User>('/auth/register', data)
    return res.data
}

export const login = async (data: LoginRequest) => {
    const res = await nextServer.post<User>('/auth/login', data)
    return res.data
}
type CheckSessionRequest = {
    success: boolean
}

export const checkSession = async () => {
    const res = await nextServer.get<CheckSessionRequest>('/auth/session')
    return res.data.success
}
export const logout = async (): Promise<void> => {
    await nextServer.post('/auth/logout')
}

export interface FetchNotesResponse {
    notes: Note[]
    totalPages: number
}

export async function fetchNotesClient(
    search = '',
    page = 1,
    perPage = 12,
    tag?: string
): Promise<FetchNotesResponse> {
    try {
        const params: Record<string, string> = {
            page: String(page),
            perPage: String(perPage),
        }
        if (search) params.search = search
        if (tag && tag.toLowerCase() !== 'all') params.tag = tag

        const { data } = await nextServer.get<FetchNotesResponse>('/notes', {
            params,
        })
        return data
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Error(
                error.response?.data?.message || 'Fetching notes failed'
            )
        }
        throw new Error('Fetching notes failed')
    }
}
