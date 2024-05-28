import { useState } from "react";
import { NewNoteCard } from "./Components/NewNoteCard";
import { NoteCard } from "./Components/NoteCard";
import LogoNLW from "../public/logo-nlw.svg";

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

  function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
    const query = event.target.value;
    setSearch(query);
  }

  const filteredNotes =
    search !== ""
      ? notes.filter((note) =>
          note.content.toLocaleLowerCase().includes(search.toLocaleLowerCase())
        )
      : notes;

  function onDeleteNote(id: string) {
    const newArrayNotes = notes.filter((note) => note.id !== id);

    setNotes(newArrayNotes);
    localStorage.setItem("notes", JSON.stringify(newArrayNotes));
  }

  return (
    <div className="mx-auto max-w-6xl my-12 space-y-6 px-5">
      <img src={LogoNLW} alt="Logo NLW" />
      <form className="w-full">
        <input
          type="text"
          onChange={handleSearch}
          placeholder="Busquem em suas notas..."
          className="w-full bg-transparent text-2xl ms:text-3xl font-semibold tracking-tight outline-none placeholder: text-slate-500  "
        />
      </form>
      <div className="h-px bg-slate-700" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[250px]">
        <NewNoteCard onNoteCreated={onNoteCreated} />
        {filteredNotes.map((note) => {
          return (
            <NoteCard onDeleteNote={onDeleteNote} key={note.id} note={note} />
          );
        })}
      </div>
    </div>
  );
}
