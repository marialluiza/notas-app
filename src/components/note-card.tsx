import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale/pt-BR';
import { X } from 'lucide-react';

interface NoteCardProps {
    note: {
        id: string;
        date: Date;
        content: string;
    };
    onNoteDeleted: (id: string) => void;
    onNoteUpdated: (id: string, content: string) => void; // Função para atualizar a nota
}

export function NoteCard({ note, onNoteDeleted, onNoteUpdated }: NoteCardProps) {
    const [isEditing, setIsEditing] = useState(false); // Estado para controlar o modo de edição
    const [editableContent, setEditableContent] = useState(note.content); // Estado para armazenar o conteúdo editável

    const handleSave = () => {
        // Chame a função de atualização da nota com o ID e o novo conteúdo
        onNoteUpdated(note.id, editableContent);
        setIsEditing(false); // Sai do modo de edição após salvar
    };

    return (
        <Dialog.Root>
            <Dialog.Trigger className="rounded-md text-left flex flex-col bg-slate-700 p-5 gap-3 overflow-hidden relative hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400 outline-none">
                <span className="text-sm font-medium text-slate-300">
                    {formatDistanceToNow(note.date, { locale: ptBR, addSuffix: true })}
                </span>
                {isEditing ? (
                    <textarea
                        className="text-sm leading-6 text-slate-400 bg-transparent outline-none border-none resize-none"
                        value={editableContent}
                        onChange={(e) => setEditableContent(e.target.value)}
                    />
                ) : (
                    <p className="text-sm leading-6 text-slate-400 ">{note.content}</p>
                )}
                <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/40 to-black/0 pointer-events-none" />
            </Dialog.Trigger>

            <Dialog.Portal>
                <Dialog.Overlay className="inset-0 fixed bg-black/50">
                    <Dialog.Content className="fixed overflow-hidden inset-0 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-[640px] w-full md:h-[70vh] bg-slate-700 md:rounded-md flex flex-col outline-none">
                        <Dialog.Close className="absolute right-0 top-0 bg-slate-800 p-1.5 text-slate-400 hover:text-slate-100">
                            <X className="size-5"></X>
                        </Dialog.Close>

                        <div className="flex flex-1 flex-col gap-3 p-5">
                            <span className="text-sm font-medium text-slate-300">
                                {formatDistanceToNow(note.date, { locale: ptBR, addSuffix: true })}
                            </span>
                            {isEditing ? (
                                <textarea
                                    className="text-sm leading-6 text-slate-400 bg-transparent outline-none border-none resize-none"
                                    value={editableContent}
                                    onChange={(e) => setEditableContent(e.target.value)}
                                />
                            ) : (
                                <p className="text-sm leading-6 text-slate-400 ">{note.content}</p>
                            )}
                        </div>

                        <div className="flex gap-3 p-5">
                            {isEditing ? (
                                <button
                                    type="button"
                                    onClick={handleSave}
                                    className="w-full bg-lime-500 py-4 text-center text-sm text-lime-950 outline-none font-medium group rounded-md"
                                >
                                    Salvar
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    onClick={() => setIsEditing(true)}
                                    className="w-full bg-slate-800 py-4 text-center text-sm text-slate-300 outline-none font-medium group rounded-md"
                                >
                                    Editar
                                </button>
                            )}

                            <button
                                type="button"
                                onClick={() => onNoteDeleted(note.id)}
                                className="w-full bg-slate-800 py-4 text-center text-sm text-slate-300 outline-none font-medium group rounded-md"
                            >
                                Deseja <span className="text-red-500 group-hover:underline">apagar essa nota</span>?
                            </button>
                        </div>
                    </Dialog.Content>
                </Dialog.Overlay>
            </Dialog.Portal>
        </Dialog.Root>
    );
}
