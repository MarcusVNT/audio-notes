import { NewNoteCard } from "./Components/NewNoteCard";
import { NoteCard } from "./Components/NoteCards";
import LogoNLW from "./assets/LogoNLW.svg";

export function App() {
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
        <NewNoteCard />
        <NoteCard />
        <NoteCard />
        <NoteCard />
        <NoteCard />
        <NoteCard />
        <NoteCard />
        <NoteCard />
      </div>
    </div>
  );
}
