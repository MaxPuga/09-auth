import { cookies } from 'next/headers';

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export const checkSession = async () => {
  const cookieStore = await cookies();

  const cookieHeader = cookieStore
    .getAll()
    .map(c => `${c.name}=${c.value}`)
    .join('; ');

  const res = await fetch(`${baseURL}/api/auth/session`, {
    headers: {
      Cookie: cookieHeader,
    },
    cache: 'no-store',
  });

  return res.json();
};

interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
  tag?: string;
}

export const fetchNotes = async (params: FetchNotesParams) => {
  const cookieStore = await cookies();

  const cookieHeader = cookieStore
    .getAll()
    .map(c => `${c.name}=${c.value}`)
    .join('; ');

  const query = new URLSearchParams();

  if (params.page) query.append('page', String(params.page));
  if (params.perPage) query.append('perPage', String(params.perPage));
  if (params.search) query.append('search', params.search);
  if (params.tag) query.append('tag', params.tag);

  const res = await fetch(`${baseURL}/notes?${query.toString()}`, {
    headers: {
      Cookie: cookieHeader,
    },
    cache: 'no-store',
  });

  return res.json();
};

// import { cookies } from 'next/headers';

// const baseURL = process.env.NEXT_PUBLIC_API_URL + '/api';

// export const checkSession = async () => {
//   const cookieStore = await cookies();

//   const cookieHeader = cookieStore
//     .getAll()
//     .map(c => `${c.name}=${c.value}`)
//     .join('; ');

//   const res = await fetch(`${baseURL}/auth/session`, {
//     method: 'GET',
//     headers: {
//       Cookie: cookieHeader,
//     },
//     cache: 'no-store',
//     credentials: 'include',
//   });

//   return res.json();
// };
