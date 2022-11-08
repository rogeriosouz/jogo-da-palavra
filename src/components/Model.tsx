import { Player } from '@lottiefiles/react-lottie-player';
import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'phosphor-react';

interface ModelProps {
  setGameOver: any;
}

export function Model({ setGameOver }: ModelProps) {
  return (
    <Dialog.Portal>
      <Dialog.Content className="border-indigo-400 border-[3px] shadow-md rounded p-2 -translate-x-1/2  -translate-y-1/2 top-[50%] left-[50%] bg-[#2A2634] fixed w-[850px] h-[50vh]">
        <Dialog.Title className="text-center text-white font-bold text-2xl mt-9">
          Voçe perdeu
        </Dialog.Title>
        <Dialog.Description className="mt-4 text-center font-semibold text-white text-2xl">
          Voçe agora tem mais 3 tentativas e seus pontos zeraram
        </Dialog.Description>

        <Player
          autoplay
          loop
          src="https://assets2.lottiefiles.com/packages/lf20_hliaii.json"
          className="w-[150px] h-[150px] pt-6"
        />

        <Dialog.Close
          onClick={() => setGameOver((v: any) => !v)}
          className="absolute outline-none left-[94%] top-[10px] bg-indigo-400 hover:bg-indigo-300 text-white rounded p-2 transition-colors"
        >
          <X size={25} aria-label="Close" />
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  );
}
