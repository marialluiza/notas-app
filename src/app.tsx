import logo from './assets/logo.svg';
import { v4 as uuidv4 } from 'uuid';
import { ChangeEvent, useState } from 'react';
import { NewNoteCard } from './components/new-note-card';
import { NoteCard } from './components/note-card';
import { Contador } from './components/contador';

interface Note {
  id: string;
  date: Date;
  content: string;
}

export function App() {
  const [search, setSearch] = useState('');
  const [notes, setNotes] = useState<Note[]>(() => {
    const noteOnStorage = localStorage.getItem('notes');

    if (noteOnStorage) {
      return JSON.parse(noteOnStorage);
    }

    return [];
  });

  function onNoteCreated(content: string) {
    const newNote = {
      id: uuidv4(), //'crypto.randomUUID' gera id unico universal em formato de string
      date: new Date(),
      content,
    };

    const notesArray = [newNote, ...notes];

    setNotes(notesArray);

    localStorage.setItem('notes', JSON.stringify(notesArray));
  }

  function onNoteDeleted(id: string) {
    const notesArray = notes.filter((note) => {
      return note.id !== id;
    });

    setNotes(notesArray);

    localStorage.setItem('notes', JSON.stringify(notesArray));
  }

  function onNoteUpdated(id: string, content: string) {
    const updatedNotes = notes.map((note) => {
      if (note.id === id) {
        return { ...note, content };
      }
      return note;
    });

    setNotes(updatedNotes);

    localStorage.setItem('notes', JSON.stringify(updatedNotes));
  }

  function handleSearch(event: ChangeEvent<HTMLInputElement>) {
    const query = event.target.value;

    setSearch(query);
  }

  const filteredNotes = search
    ? notes.filter((note) => note.content.toLowerCase().includes(search.toLowerCase()))
    : notes;

  return (
    <div className="mx-auto max-w-6xl my-12 space-y-6 px-5">
      <div className="flex justify-between">
        <img src={logo} className="w-40 h-auto" />

        <div className="flex mt-4">
          <Contador />
        </div>
      </div>

      <form className="w-full mt-4">
        <input
          type="text"
          placeholder="Busque em suas notas..."
          className="w-full bg-transparent text-3xl font-normal tracking-tight outline-none placeholder:text-slate-500"
          onChange={handleSearch}
        />
      </form>

      <div className="h-px bg-slate-700" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[250px]">
        <NewNoteCard onNoteCreated={onNoteCreated} />

        {/*como as infos das notas estão dentro de um array, usa-se 'map' para percorrer o array */}
        {/* 'key' é uma propriedade do React, ele usa para deixar a aplicação mais performática e se basear nessa key pra saber "com quem" fazer algo*/}
        {filteredNotes.map((note) => (
          <NoteCard
            key={note.id}
            note={note}
            onNoteDeleted={onNoteDeleted}
            onNoteUpdated={onNoteUpdated}
          />
        ))}
      </div>
    </div>
  );
}
