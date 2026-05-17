export default function NotesLayout({
  children,
  modal,
  sidebar,
}: {
  children: React.ReactNode;
  modal?: React.ReactNode;
  sidebar?: React.ReactNode;
}) {
  return (
    <>
      {children}
      {modal}
      {sidebar}
    </>
  );
}
