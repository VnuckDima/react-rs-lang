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
  gameOptions: { group: number, pageState:number, game:string }
}

export default function LoadGame({ gameOptions }: TLoadGame) {
  const { learnedWords } = useTypedSelector((state) => state.user);
  const [gameWords, setGameWords] = useState<wordExtended[]>([]);
  const [load, setLoad] = useState(false);
  const { group, pageState, game } = gameOptions;
  useEffect(() => {
    if (game === games.SPRINT) {
      (async () => {
        const words = await buildArrayQuestions(pageState, learnedWords, group, 80);
        setGameWords(words);
        setLoad(true);
      })();
    }
    (async () => {
      const words = await buildArrayQuestions(pageState, learnedWords, group, 20);
      setGameWords(words);
      setLoad(true);
    })();
  }, []);

  if (!load) {
    return <Preloader />;
  }

  if (gameWords.length === 0) {
    return <h2>Недостаточно слов для игры</h2>;
  }
  switch (gameOptions.game) {
    case games.AUDIO_CALL: {
      return <AudioCall questions={gameWords} />;
    }
    case games.SAVANNAH: {
      return <SavannahGame questions={gameWords} />;
    }
    // case games.SPRINT: {
    //   return <SprintGame />;
    // }
    default: {
      return <>Error</>;
    }
  }
}
