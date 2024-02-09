import { useState } from "react";
import { NewNoteCard } from "./Components/NewNoteCard";
import { NoteCard } from "./Components/NoteCard";
import LogoNLW from "./assets/LogoNLW.svg";

interface Note {
  id: string;
  date: Date;
  content: string;
}

export function App() {
  const [search, setSearch] = useState("");
  const [notes, setNotes] = useState<Note[]>(() => {
    const notesOnStorage = localStorage.getItem("notes");

    if (notesOnStorage) {
      const parsedNotes = JSON.parse(notesOnStorage);
      return parsedNotes.map((note: Note) => ({
        ...note,
        date: new Date(note.date),
      }));
    }

    return [];
  });

  function onNoteCreated(content: string) {
    const newNote = {
      id: crypto.randomUUID(),
      date: new Date(),
      content,
    };
    const notesArray = [newNote, ...notes];
    setNotes(notesArray);
    localStorage.setItem("notes", JSON.stringify(notesArray));
  }

  return (
    <div className="mx-auto max-w-6xl my-12 space-y-6">
      <img src={LogoNLW} alt="Logo NLW" />
      <form className="w-full">
        <input
          type="text"
          placeholder="Busquem em suas notas..."
          className="w-full bg-transparent text-3xl font-semibold tracking-tight outline-none placeholder: text-slate-500 "
        />
      </form>
      <div className="h-px bg-slate-700" />

      <div className="grid grid-cols-3 gap-6 auto-rows-[250px]">
        <NewNoteCard onNoteCreated={onNoteCreated} />
        {notes.map((note) => {
          return <NoteCard key={note.id} note={note} />;
        })}
      </div>
    </div>
  );
}
