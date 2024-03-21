import * as Dialog from '@radix-ui/react-dialog'; // bibliteca para de componentes - aqui foi utilizado o 'Dialog' para criação de pop-up
import { formatDistanceToNow } from 'date-fns'; // bibliteca para formatar data
import { ptBR } from 'date-fns/locale/pt-BR'
import { X } from 'lucide-react'; // bibliteca de icones

interface NoteCardProps{
    note: {
        id: string
        date: Date
        content: string
    }
    onNoteDeleted: (id:string) => void
}

export function NoteCard({note, onNoteDeleted}: NoteCardProps){
    return(

    <Dialog.Root>
        {/* 'trigger' vai no elemento que você vai clicar para abrir o modal*/}
        <Dialog.Trigger className="rounded-md text-left flex flex-col bg-slate-800 p-5 gap-3 overflow-hidden relative hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400 outline-none">
            <span className="text-sm font-medium text-slate-300">
                {formatDistanceToNow(note.date, {locale: ptBR, addSuffix: true})}   
            </span>

            <p className="text-sm leading-6 text-slate-400 ">
                {note.content}
            </p>

            <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/60 to-black/0 pointer-events-none"/>
        </Dialog.Trigger>

        <Dialog.Portal> {/* 'Portal' manda o conteúdo pra raiz da aplicação*/}
            <Dialog.Overlay className="inset-0 fixed bg-black/50">  {/* 'div' que cobre o restante da aplicação */}

                {/* 'content' para o que vai aparecer no modal*/}
                <Dialog.Content className="fixed overflow-hidden inset-0 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-[640px] w-full md:h-[70vh] bg-slate-700 md:rounded-md flex flex-col outline-none"> 
                   
                    <Dialog.Close className="absolute right-0 top-0 bg-slate-800 p-1.5 text-slate-400 hover:text-slate-100">  {/* icone de fechar pop-up */}
                        <X className="size-5"></X>  {/* size pode substituir o 'w' e o 'h' colocando o msm valor pra ambos */}
                    </Dialog.Close>

                    <div className="flex flex-1 flex-col gap-3 p-5"> 
                        <span className="text-sm font-medium text-slate-300">
                            {formatDistanceToNow(note.date, {locale: ptBR, addSuffix: true})}
                        </span>

                        <p className="text-sm leading-6 text-slate-400 ">
                            {note.content}
                        </p>                    
                    </div>

                    <button 
                        type="button" 
                        onClick={() => onNoteDeleted(note.id)}
                        className="w-full bg-slate-800 py-4 text-center text-sm text-slate-300 outline-none font-medium group">
                        Deseja <span className="text-red-500 group-hover:underline">apagar essa nota</span>?
                    </button>

                </Dialog.Content> 

            </Dialog.Overlay>          
        </Dialog.Portal>


    </Dialog.Root>

    )
}