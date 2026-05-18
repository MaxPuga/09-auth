import type { Metadata } from 'next';
import NotesClient from './Notes.client';

interface Props {
  params: Promise<{
    slug?: string[];
  }>;
}

export default async function Page() {
  return <NotesClient />;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const tag = slug?.[0] || 'all';

  return {
    title: `Notes - ${tag}`,
    description: `Filtered notes by ${tag}`,
  };
}
