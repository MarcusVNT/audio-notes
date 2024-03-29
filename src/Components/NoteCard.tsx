import * as Dialog from "@radix-ui/react-dialog";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { X } from "lucide-react";

interface NoteCardProps {
  note: {
    id: string;
    date: Date;
    content: string;
  };

  onDeleteNote: (id: string) => void;
}

export function NoteCard({ note, onDeleteNote }: NoteCardProps) {
  function handleDeleteNote() {
    onDeleteNote(note.id);
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger className="rounded-md text-left flex flex-col outline-none bg-slate-800 p-5 gap-3 overflow-hidden relative hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400">
        <span className="text-sm font-medium text-slate-300">
          {formatDistanceToNow(note.date, {
            locale: ptBR,
            addSuffix: true,
          })}{" "}
          - {note.date.toLocaleTimeString()}
        </span>
        <p className="text-sm leading-6 text-slate-400">{note.content}</p>

        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/60 to-black/0 pointer-events-none" />
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="inset-0 fixed bg-black/60" />
        <Dialog.Content className="fixed inset-0 sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:max-w-[640px] w-full sm:h-[60vh] bg-slate-700 sm:rounded-md flex flex-col outline-none overflow-hidden">
          <Dialog.Close className="absolute top-0 right-0 bg-slate-800 p-[6px] text-slate-400 hover:text-slate-100">
            <X className="size-5" />
          </Dialog.Close>
          <div className="flex flex-1 flex-col p-5 gap-3 overflow-auto">
            <span className="text-sm font-medium text-slate-300">
              {formatDistanceToNow(note.date, {
                locale: ptBR,
                addSuffix: true,
              })}{" "}
              - {note.date.toLocaleTimeString()}
            </span>
            <p className="text-sm leading-6 text-slate-400">{note.content}</p>
          </div>

          <button
            type="button"
            onClick={handleDeleteNote}
            className="w-full bg-slate-800 py-4 text-center text-sm text-slate-300 outline-none font-medium group"
          >
            <span className="text-red-400 group-hover:underline ">Apagar</span>{" "}
            Nota!
          </button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
