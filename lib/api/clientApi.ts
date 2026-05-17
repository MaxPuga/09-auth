import { api } from './api';
import type { Note } from '@/types/note';
import type { User } from '../../types/user';

interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
  tag?: string;
}

export const register = async (data: { email: string; password: string }) => {
  const res = await api.post<User>('/auth/register', data);
  return res.data;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export const login = async (data: LoginRequest) => {
  const res = await api.post('/auth/login', data);

  return res.data;
};

export const logout = async () => {
  const res = await api.post('/auth/logout');

  return res.data;
};

export const checkSession = async () => {
  const res = await api.get<User | null>('/auth/session');
  return res.data;
};

export const getMe = async () => {
  const res = await api.get<User>('/users/me');
  return res.data;
};

export const updateMe = async (data: { username: string }) => {
  const res = await api.patch<User>('/users/me', data);

  return res.data;
};

export const fetchNotes = async (params: FetchNotesParams) => {
  const res = await api.get('/notes', { params });
  return res.data;
};

export const fetchNoteById = async (id: string) => {
  const res = await api.get(`/notes/${id}`);
  return res.data;
};

export const createNote = async (
  data: Pick<Note, 'title' | 'content' | 'tag'>
) => {
  const res = await api.post('/notes', data);
  return res.data;
};

export const deleteNote = async (id: string) => {
  const res = await api.delete(`/notes/${id}`);
  return res.data;
};
