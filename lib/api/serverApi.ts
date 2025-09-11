// lib/api/serverApi.ts

import { cookies } from "next/headers";
import { nextServer } from './api';
import { User } from './clientApi';
import { Note } from '@/types/note';
import { isAxiosError } from 'axios';
export const checkServerSession = async () => {
  // Дістаємо поточні cookie
  const cookieStore = await cookies();
  const res = await nextServer.get('/auth/session', {
    headers: {
      // передаємо кукі далі
      Cookie: cookieStore.toString(),
    },
  });
  // Повертаємо повний респонс, щоб middleware мав доступ до нових cookie
  return res;
};

export async function getAuthHeaders(): Promise<{
  headers: { Cookie: string };
}> {
  const cookieStore = await cookies();
  const cookieString = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");
  return {
    headers: { Cookie: cookieString },
  };
}

export const getServerMe = async (): Promise<User> => {
  const cookieStore = await cookies();
  const { data } = await nextServer.get('/auth/me', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};

export async function fetchNotes(
  search = "",
  page = 1,
  perPage = 12,
  tag?: string
): Promise<{ notes: Note[]; totalPages: number }> {
  try {
    const headers = await getAuthHeaders();
    const params: Record<string, string> = {
      page: String(page),
      perPage: String(perPage),
    };
    if (search) params.search = search;
    if (tag && tag.toLowerCase() !== "all") params.tag = tag;

    const { data } = await nextServer.get<{
      notes: Note[];
      totalPages: number;
    }>("/notes", headers);
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Fetching notes failed");
    }
    throw new Error("Fetching notes failed");
  }
}
export async function getNoteById(id: string): Promise<Note> {
  try {
    const headers = await getAuthHeaders();
    const { data } = await nextServer.get<Note>(`/notes/${id}`, headers);
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Fetching note failed");
    }
    throw new Error("Fetching note failed");
  }
}
export async function deleteNote(id: string): Promise<Note> {
  try {
    const headers = await getAuthHeaders();
    const { data } = await nextServer.delete<Note>(`/notes/${id}`, headers);
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Deleting note failed");
    }
    throw new Error("Deleting note failed");
  }
}