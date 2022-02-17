import React, { useEffect, useState } from 'react';
import Preloader from '../../../components/Preloader/Preloader';
import { useTypedSelector } from '../../../hooks/useTypeSelector';
import { IUserAddWords, word } from '../../../types/types';
import { games } from '../../../utils/utils';
import AudioCall from '../../audio-call/audioCall/AudioCall';
import SprintGame from '../../sprint/SprintGame/SprintGame';

type TLoadGame = {
  gameOptions: { group: number, pageState:number, game:string }
}

function buildArrayQuestions(page: number, learnWords: IUserAddWords, words: word[]): word[] {
  const questions: word[] = [];
  let pageNum = page;
  const arrayPerPage = words.filter((word) => (word.id in learnWords ? false : word));
    questions.push(...arrayPerPage);
    pageNum -= 1;
    console.log(questions);
  /* while (pageNum !== 0 || questions.length !== 20) {
    const arrayPerPage = words.filter((word) => (word.id in learnWords ? false : word));
    questions.push(...arrayPerPage);
    pageNum -= 1;
    console.log(questions);
  }
  */
  return questions;
}

export default function LoadGame({ gameOptions }: TLoadGame) {
  const { learnedWords } = useTypedSelector((state) => state.user);
  const { words } = useTypedSelector((state) => state.words);
  const [load, setLoad] = useState(false);
  const { group, pageState, game } = gameOptions;
  useEffect(() => {
    buildArrayQuestions(pageState, learnedWords, words);
  }, []);

  if (!load) {
    return <Preloader />;
  }

  switch (gameOptions.game) {
    case games.AUDIO_CALL: {
      return <AudioCall answers={[]} questions={[[]]} />;
    }
    // case games.SPRINT: {
    //   return <SprintGame />;
    // }
    default: {
      return <>Error</>;
    }
  }
}
