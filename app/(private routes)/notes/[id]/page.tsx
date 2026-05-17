import type { Metadata } from 'next';

import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from '@tanstack/react-query';

import { fetchNoteById } from '@/lib/api/serverApi';

import NoteDetails from './NoteDetails.client';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetails id={id} />
    </HydrationBoundary>
  );
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;

  try {
    const note = await fetchNoteById(id);

    return {
      title: note.title,
      description: note.content.slice(0, 100),
      openGraph: {
        title: note.title,
        description: note.content.slice(0, 100),
        url: `/notes/${id}`,
        images: [
          {
            url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          },
        ],
      },
    };
  } catch {
    return {
      title: 'Note not found',
      description: 'This note does not exist',
    };
  }
}
