import { cookies } from 'next/headers';
import { api } from './api';

import type { Note } from '../../types/note';
import type { User } from '../../types/user';

interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
  tag?: string;
}

async function getCookieHeader() {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;

  return [
    accessToken ? `accessToken=${accessToken}` : '',
    refreshToken ? `refreshToken=${refreshToken}` : '',
  ]
    .filter(Boolean)
    .join('; ');
}

export const checkSession = async () => {
  const cookieHeader = await getCookieHeader();

  const res = await api.get<User | null>('/auth/session', {
    headers: {
      Cookie: cookieHeader,
    },
  });

  return res.data;
};

export const getMe = async () => {
  const cookieHeader = await getCookieHeader();

  const res = await api.get<User>('/users/me', {
    headers: {
      Cookie: cookieHeader,
    },
  });

  return res.data;
};

export const fetchNotes = async (params: FetchNotesParams) => {
  const cookieHeader = await getCookieHeader();

  const res = await api.get('/notes', {
    params,
    headers: {
      Cookie: cookieHeader,
    },
  });

  return res.data;
};

export const fetchNoteById = async (id: string) => {
  const cookieHeader = await getCookieHeader();

  const res = await api.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: cookieHeader,
    },
  });

  return res.data;
};
