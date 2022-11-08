import * as Dialog from '@radix-ui/react-dialog';
import { Heart } from 'phosphor-react';
import { useEffect, useRef, useState } from 'react';
import { Model } from '../components/Model';

const list: any = {
  animal: ['cachorro', 'animal', 'lorem'],
  comida: ['arroz', 'macarão', 'feijão'],
  carro: ['cambio', 'freio', 'motor'],
};

function randomNumber(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

export function Game() {
  const [score, setScore] = useState(0);
  const [playerInput, setPlayerInput] = useState('');
  const [tentativas, setTentativas] = useState(3);
  const [validate, setValidate] = useState<string[]>([]);
  const [palavra, setPalara] = useState('test');
  const [type, setType] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [record, serRecord] = useState(0);
  const input = useRef<HTMLInputElement | null>(null);

  const tentativasArray: number[] = [];
  for (let i = 0; i < tentativas; i++) {
    tentativasArray.push(i);
  }

  useEffect(() => {
    input.current?.focus();
    const typeGame =
      Object.keys(list)[randomNumber(0, Object.keys(list).length)];
    setType(typeGame);

    setPalara(list[typeGame][randomNumber(0, list[typeGame].length)]);
  }, []);

  useEffect(() => {
    if (tentativas === 0) {
      setValidate([]);
      setPlayerInput('');
      setTentativas(3);
      setGameOver(true);

      if (score > record) {
        serRecord(score);
        localStorage.setItem('record', JSON.stringify(score));
      }

      setScore(0);

      const typeGame =
        Object.keys(list)[randomNumber(0, Object.keys(list).length)];
      setType(typeGame);

      setPalara(list[typeGame][randomNumber(0, list[typeGame].length)]);
      input.current?.focus();
      return;
    }
  }, [tentativas]);

  useEffect(() => {
    const isWinner: string[] = [];

    palavra?.split('').map((item) => {
      if (validate.includes(item)) {
        isWinner.push(item);
      }
    });

    if (isWinner.join('').includes(palavra)) {
      setValidate([]);
      setPlayerInput('');
      setScore((v) => v + 100);

      const typeGame =
        Object.keys(list)[randomNumber(0, Object.keys(list).length)];
      setType(typeGame);

      setPalara(list[typeGame][randomNumber(0, list[typeGame].length)]);

      input.current?.focus();
      return;
    }
  });

  function hadleclickButton() {
    if (playerInput === '') {
      setPlayerInput('');
      return;
    }

    if (!palavra?.includes(playerInput)) {
      setTentativas((v) => v - 1);
      setPlayerInput('');
      return;
    }

    setValidate([...validate, playerInput]);
    setPlayerInput('');
    input.current?.focus();
  }

  return (
    <section className="w-screen h-screen  bg-zinc-900 flex items-center justify-center">
      <div className="min-w-min border-[3px] border-indigo-500  bg-[#2A2634] p-9 rounded relative">
        <div className="w-full flex justify-between mb-10">
          <div className="text-start flex flex-col items-start justify-center gap-2 w-[200px] h-24 bg-white px-5 rounded border-[3px] border-indigo-500">
            <p className="font-semibold text-xl text-black">
              Tipo: <span className="text-bold text-indigo-500"> {type}</span>
            </p>
            <p className="font-semibold text-xl text-black">
              record:{' '}
              <span className="text-bold text-indigo-500">
                {' '}
                {localStorage.getItem('record')}
              </span>
            </p>
          </div>

          <div className="flex flex-col items-start justify-center gap-2 w-[200px] h-24 bg-white px-5 rounded border-[3px] border-indigo-500">
            <p className="text-black text-xl font-bold">
              pontuaçao:{' '}
              <span className="text-bold text-indigo-500">{score}</span>
            </p>
            <p className="text-black text-xl font-bold flex items-center gap-2">
              vidas:{' '}
              <span className="text-bold flex items-center  text-indigo-500">
                {tentativasArray.map((_) => (
                  <Heart key={_} size={22} weight="bold" />
                ))}
              </span>
            </p>
          </div>
        </div>

        <div className="min-w-min h-24 bg-zinc-800 flex items-center gap-5 mb-10">
          {palavra?.split('').map((item, index) => (
            <div
              key={index}
              className=" w-28 h-full rounded-md border-[3px] border-indigo-500 bg-white flex items-center justify-center"
            >
              {validate.includes(item) ? (
                <p className="text-8xl text-black">{item}</p>
              ) : (
                ''
              )}
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-4 rounded">
          <input
            onChange={(e) => setPlayerInput(e.target.value)}
            className="max-w-[60px] border-[3px] border-indigo-500  outline-none px-2 py-2 font-bold text-2xs w-full h-10 rounded"
            type="text"
            ref={input}
            onKeyDown={() => hadleclickButton()}
            value={playerInput}
          />
          <button
            onClick={() => hadleclickButton()}
            type="submit"
            className="w-[100px] hover:bg-indigo-400 transition-colors  h-10 rounded text-white bg-indigo-500"
          >
            Jogar
          </button>
        </div>
      </div>
      <Dialog.Root open={gameOver}>
        <Dialog.Overlay className="w-full h-full fixed bg-[#0e0d0d]" />
        <Model setGameOver={setGameOver} />
      </Dialog.Root>
    </section>
  );
}
