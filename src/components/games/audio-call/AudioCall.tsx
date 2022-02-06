import React, { useEffect, useState } from 'react';
import useWordsActions from '../../../hooks/useWordsAction';
import { useTypedSelector } from '../../../hooks/useTypeSelector';
import { HEAD_URL } from '../../../utils/API';
import { audioCallAnswer, word } from '../../../types/types';
import AnswerBtn from './UI/AnswerBtn/AnswerBtn';

// TODO We should move both playAudio functions to Utils and unite them.
function playAudio(sound:string) {
  const soundUrl = `${HEAD_URL}/${sound}`;
  // console.log(soundUrl);
  const audio = new Audio(soundUrl);
  audio.volume = 0.5;
  audio.play();
}

// In the Future this function will assign shuffled words
// TODO Need to rewrite it
function assignFiveWords(words: word[]): audioCallAnswer[] {
  const fiveWordsArr: audioCallAnswer[] = [];
  for (let i = 0; i < 5; i += 1) {
    fiveWordsArr.push({ wordTranslate: words[i].wordTranslate, id: words[i].id });
    // console.log(i);
    // console.log(words[i].wordTranslate);
    // console.log(fiveWordsArr);
  }
  return fiveWordsArr;
}

function AudioCall() {
  const words = useTypedSelector((state) => state.words);
  const { loadWords } = useWordsActions();
  const fiveWordsArr = assignFiveWords(words);
  // console.log(fiveWordsArr);

  useEffect(() => {
    loadWords(0, 0);
  }, []);

  return (
    <div className="audiocall">
      <div className="audiocall__container">
        <button onClick={() => playAudio(words[0].audio)} type="button">Озвучить слово</button>
        <div className="answers__container">
          {fiveWordsArr.map((word) => <AnswerBtn text={word.wordTranslate} key={word.id} />)}
        </div>
      </div>
    </div>
  );
}

export default AudioCall;
