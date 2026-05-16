import { fetchNotes } from '@/lib/api/serverApi';
import NoteList from '@/components/NoteList/NoteList';

export default async function NotesPage() {
  const data = await fetchNotes({
    page: 1,
    perPage: 12,
  });

  console.log(data);

  return (
    <main>
      <h1>My Notes</h1>

      <NoteList notes={data.notes} />
    </main>
  );
}
