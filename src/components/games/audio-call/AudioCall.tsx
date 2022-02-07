import React, { useEffect, useState } from 'react';
import useWordsActions from '../../../hooks/useWordsAction';
import { useTypedSelector } from '../../../hooks/useTypeSelector';
import { HEAD_URL } from '../../../utils/API';
import { audioCallAnswer, word } from '../../../types/types';
import AnswerBtn from './UI/AnswerBtn/AnswerBtn';
import CategorySelect from './UI/AnswerBtn/CategorySelect/CategorySelect';

// TODO We should move both playAudio functions to Utils and unite them.
function playAudio(sound:string) {
  const soundUrl = `${HEAD_URL}/${sound}`;
  // console.log(soundUrl);
  const audio = new Audio(soundUrl);
  console.log(audio.duration);
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
  const { words, isLoaded } = useTypedSelector((state) => state.words);
  const { loadWords } = useWordsActions();
  const [isGame, setIsGame] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [fiveWordsArr, setFiveWordsArr] = useState<audioCallAnswer[]>([]);
  const [questionNumber, setQuestionNumber] = useState(0);

  useEffect(() => {
    loadWords(0, selectedCategory);
  }, [selectedCategory]);

  useEffect(() => {
    if (isLoaded) {
      setFiveWordsArr(assignFiveWords(words));
    }
    // console.log(isLoaded);
  }, [isLoaded]);

  if (!isGame) {
    return <CategorySelect setIsGame={setIsGame} setSelectedCategory={setSelectedCategory} />;
  }

  return (
    <div className="audiocall">
      <div className="audiocall__container">
        <button onClick={() => playAudio(words[0].audio)} type="button">Озвучить слово</button>
        <div className="answers__container">
          {fiveWordsArr.map((word) => <AnswerBtn text={word.wordTranslate} key={word.id} />)}
          {/* <AnswerBtn text={questionsArray[questionNumber]} callback={setQuestionNumber} /> */}
        </div>
      </div>
    </div>
  );
}

// questionsArray - массив из 20 обьектов, questionNumber = номер вопроса

export default AudioCall;
