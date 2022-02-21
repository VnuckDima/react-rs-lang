import React, { useEffect, useState } from 'react';
import Preloader from '../../../components/Preloader/Preloader';
import { useTypedSelector } from '../../../hooks/useTypeSelector';
import { IUserAddWords, word, wordExtended } from '../../../types/types';
import { buildArrayQuestions, HEAD_URL } from '../../../utils/API';
import { games, makeBVFROMRUArrayQuestions } from '../../../utils/utils';
import AudioCall from '../../audio-call/AudioCallGame/AudioCallGame';
import SavannahGame from '../../savannah/SavannahGame/SavannahGame';
import SprintGame from '../../sprint/SprintGame/SprintGame';

type TLoadGame = {
  gameOptions: { selectedCategory: number, pageState:number, game:string }
}

export default function LoadGame({ gameOptions }: TLoadGame) {
  const { learnedWords } = useTypedSelector((state) => state.user);
  const [gameWords, setGameWords] = useState<wordExtended[]>([]);
  const [load, setLoad] = useState(false);
  const { selectedCategory, pageState, game } = gameOptions;
  useEffect(() => {
    if (game === games.SPRINT) {
      (async () => {
        const words = await buildArrayQuestions(pageState, learnedWords, selectedCategory, 80);
        setGameWords(words);
        setLoad(true);
      })();
    }
    (async () => {
      const words = await buildArrayQuestions(pageState, learnedWords, selectedCategory, 20);
      setGameWords(words);
      setLoad(true);
      // console.log(words);
    })();
  }, []);

  if (!load) {
    return <Preloader />;
  }

  if (gameWords.length === 0) {
    return (
      <div className="main__container">
        <div className="wrapper">
          <h2 className="loadgame__error">Недостаточно слов для игры</h2>
        </div>
      </div>
    );
  }
  switch (gameOptions.game) {
    case games.AUDIO_CALL: {
      return <AudioCall questions={gameWords} />;
    }
    case games.SAVANNAH: {
      return <SavannahGame questions={gameWords} />;
    }
     case games.SPRINT: {
       return <SprintGame questions={gameWords} />;
     }
    default: {
      return <>Error</>;
    }
  }
}
