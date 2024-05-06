import * as Dialog from '@radix-ui/react-dialog'; // bibliteca para de componentes - aqui foi utilizado o 'Dialog' para criação de pop-up
import { X } from 'lucide-react'; // bibliteca de icones
import { ChangeEvent, FormEvent, useState } from 'react';
import { toast } from 'sonner'; // biblioteca para alertas (ex: alerta de que alguma operação deu certo/errado)

interface NewNoteCardProps {
  onNoteCreated: (content: string) => void
}

// let speechRecognition: SpeechRecognition | null = null

export function NewNoteCard({ onNoteCreated }: NewNoteCardProps) {
  // não pode apenas trocar o valor da váriavel pois o 'useState' devolve ela em um array , por isso é colocada uma função junto pra que ela sim altere o valor booleano do UseState da variável
  // const [shouldShowOnboarding, setShouldShowOnborading] = useState(true)
  // const [isRecording, setIsRecording] = useState(false)
  const [content, setContent] = useState('')

  // function handleStartEditor() {
  //   setShouldShowOnborading(false)
  // }

  // lembrete: o tipo do evento pode ser visto ao descanssar o mouse em cima do evento
  // '<HTMLTextAreaElement>' está sendo utilizado pois 'changeEvent' ñ basta como tipo pois changeEvent também acontece em outros tipos de eventos, e aquele 'value' dentro da função só é válido pra TextArea e input, por isso teve de especificar no tipo que era um TextArea
  // 'value' é válido especificamente pra 'TextArea' e 'input' por isso além do 'changeEvent' sendo passado como tipo de evento, também foi acrescentado o 'TextAreaElement' dentro de <> 
  function handleContentChanged(event: ChangeEvent<HTMLTextAreaElement>) {
    setContent(event.target.value)

    // if (event.target.value === '') {
    //   setShouldShowOnborading(true)
    // }
  }

  function handleSaveNote(event: FormEvent) {
    // por padrão um form envia a requisição e 'some' pq ele considera que o usuário vai pra outra pag mas como esse não é o caso aqui, foi usado 'preventDefault' pra que ele ñ siga esse comportamento padrão
    event.preventDefault()

    if (content === '') {
      return
    }

    onNoteCreated(content)

    setContent('')

    // setShouldShowOnborading(true)

    toast.success('Nota criada com sucesso')
  }

  // function handleStartRecording() {
  //   const isSpeechRecognitionAPIAvailable = 'SpeechRecognition' in window
  //     || 'webkitSpeechRecognition' in window

  //   if (!isSpeechRecognitionAPIAvailable) {
  //     alert('Infelizmente seu navegador não suporta a API de gravação!')
  //     return
  //   }

    // setIsRecording(true)
    // setShouldShowOnborading(false)

  //   const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition

  //   speechRecognition = new SpeechRecognitionAPI()

  //   speechRecognition.lang = 'pt-BR'
  //   speechRecognition.continuous = true
  //   speechRecognition.maxAlternatives = 1
  //   speechRecognition.interimResults = true

  //   speechRecognition.onresult = (event) => {
  //     const transcription = Array.from(event.results).reduce((text, result) => {
  //         return text.concat(result[0].transcript)
  //     }, '')

  //     setContent(transcription)
  //   }

  //   speechRecognition.onerror = (event) => {
  //     console.error(event)
  //   }

  //   speechRecognition.start()

  // }

  // function handleStopRecording() {
  //   setIsRecording(false)

  //   if (speechRecognition != null){
  //     speechRecognition.stop()
  //   } 
  // }

  return (
    <Dialog.Root>
      {/* 'Trigger' é um botão que vem com alguns estilos de centralização */}
      {/* quando 'flex' deve-se usar o gap junto invés de 'sapce'*/}
      <Dialog.Trigger className=" flex flex-col rounded-md bg-slate-600 p-5 gap-3 text-left hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400 outline-none">
        <span className="text-sm font-medium text-slate-200">
          Adicionar nota
        </span>

        <p className="text-sm leading-6 text-slate-300 ">
          Comece a escrever uma nova nota aqui.
          {/* ou grave um áudio que será convertido para texto automaticamente. */}
        </p>
      </Dialog.Trigger>

      <Dialog.Portal> {/* 'Portal' teleporta o conteúdo pra raiz da aplicação*/}
        <Dialog.Overlay className="inset-0 fixed bg-black/50">  {/* 'div' que cobre o restante da aplicação */}

          {/* 'content' para o que vai aparecer no modal*/}
          <Dialog.Content className="fixed overflow-hidden inset-0 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-[640px] w-full md:h-[70vh] bg-slate-700 md:rounded-md flex flex-col outline-none">

            <Dialog.Close className="absolute right-0 top-0 bg-slate-800 p-1.5 text-slate-400 hover:text-slate-100">  {/* icone de fechar pop-up */}
              <X className="size-5"></X>  {/* size pode substituir o 'w' e o 'h' colocando o msm valor pra ambos */}
            </Dialog.Close>

            <form className="flex flex-1 flex-col ">

              <div className="flex flex-1 flex-col gap-3 p-5">
                <span className="text-sm font-medium text-slate-300">
                  Adicionar nota
                </span>

                {/* if else:
                    '?' é o 'então' 
                    ':' é o 'senão'*/}
                {/* {shouldShowOnboarding ? ( */}
                  {/*  <p className="text-sm leading-6 text-slate-400 ">
                     Comece <button type="button" onClick={handleStartRecording} className="text-lime-400 text-sm hover:underline">gravando uma nota</button> em áudio ou se preferir <button type="button" onClick={handleStartEditor} className="text-lime-400 text-sm hover:underline">utilize apenas texto</button>
                  </p> */}
                {/* ) : (
                  'autoFocus' - assim que ela aparece já pode começar a digitar nela
                  'resize' - permite que o usuário altere o tamanho dela */}
                  <textarea
                    autoFocus
                    className="text-sm leading-6  text-slate-400 bg-transparent resize-none flex-1 outline-none"
                    // 'onChange' - evento
                    onChange={handleContentChanged}
                    value={content}

                  />

                {/* )} */}

              </div>

              {/* {isRecording ? (
                <button
                  type="button"
                  onClick={handleStopRecording}
                  className="w-full flex justify-center items-center gap-2 bg-slate-900 py-4 text-center text-sm text-slate-300 outline-none font-medium hover:text-slate-100">
                  <div className="size-3 rounded-full bg-red-500 animate-pulse" />
                  Gravando! (Clique para interromper gravação)
                </button>
              ) : ( */}
                <button
                  type="button"
                  onClick={handleSaveNote}
                  className="w-full bg-lime-400 py-4 text-center text-sm text-lime-950 outline-none font-medium hover:bg-lime-500">
                  Salvar nota
                </button>
              {/* )} */}

            </form>

          </Dialog.Content>

        </Dialog.Overlay>
      </Dialog.Portal>


    </Dialog.Root>

  )

}