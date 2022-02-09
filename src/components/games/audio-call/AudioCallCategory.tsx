import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import useWordsActions from '../../../hooks/useWordsAction';
import { useTypedSelector } from '../../../hooks/useTypeSelector';
import { TAnswers, word } from '../../../types/types';
import CategorySelect from './CategorySelect/CategorySelect';
import { playAudio, randomNum, shuffle } from '../../../utils/utils';
import EndAudioGame from './EndAudioGame/EndAudioGame';
import { HEAD_URL } from '../../../utils/API';
import AudioBtn from './AudioBtn/AudioBtn';

function makeQuestion(words: word[], firstWord:string): string[] {
  const set = new Set<string>();
  set.add(firstWord);
  for (let i = 0; ; i += 1) {
    set.add(words[randomNum(0, 19)].wordTranslate);
    if (set.size === 5) return [...set];
  }
}

function makeArrayQuestions(words: word[]) {
  const arrayQuestions:[string[]] = [shuffle([...makeQuestion(words, words[0].wordTranslate)])];
  for (let i = 1; i < 20; i += 1) {
    const oneQuestion = shuffle([...makeQuestion(words, words[i].wordTranslate)]);
    arrayQuestions.push(oneQuestion);
  }
  return arrayQuestions;
}
// прокинуть пропсом isGame, selectedCategory
function AudioCallCategory() {
  const { words, isLoaded } = useTypedSelector((state) => state.words);
  const dispatch = useDispatch();
  const { loadWords } = useWordsActions();
  const [isGame, setIsGame] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [questions, setQuestions] = useState<[string[]]>([[]]);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState<TAnswers[]>([]);
  const [incorrectAnswers, setIncorrectAnswers] = useState<TAnswers[]>([]);

  useEffect(() => {
    if (isGame) {
      loadWords(randomNum(0, 19), selectedCategory);
      setCorrectAnswers([]);
      setIncorrectAnswers([]);
    }
  }, [selectedCategory, isGame]);

  useEffect(() => {
    if (isLoaded) {
      setQuestions(makeArrayQuestions(words));
      setTimeout(() => playAudio(words[0].audio, HEAD_URL), 1000);
    }
    return () => {
      dispatch({ type: 'IS_LOADING' });
    };
  }, [isLoaded]);

  useEffect(() => {
    if (questionNumber > 0 && isGame) {
      setTimeout(() => playAudio(words[questionNumber].audio, HEAD_URL), 500);
    }
  }, [questionNumber]);

  if (questionNumber === 6 && isGame) {
    return (
      <EndAudioGame
      setIsGame={setIsGame}
      answers={{ correctAnswers, incorrectAnswers }}
      setQuestionNumber={setQuestionNumber}
      />
    );
  }

  if (!isGame) {
    return <CategorySelect setIsGame={setIsGame} setSelectedCategory={setSelectedCategory} />;
  }
  return (
    <div className="audiocall">
      <div className="audiocall__container">
        <svg
          onClick={() => playAudio(words[questionNumber].audio, HEAD_URL)}
          className="bi bi-volume-up-fill audiocall__svg"
          viewBox="0 0 16 16"
        >
          <path d="M11.536 14.01A8.473 8.473 0 0 0 14.026 8a8.473 8.473 0 0 0-2.49-6.01l-.708.707A7.476 7.476 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303l.708.707z" />
          <path d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.483 5.483 0 0 1 11.025 8a5.483 5.483 0 0 1-1.61 3.89l.706.706z" />
          <path d="M8.707 11.182A4.486 4.486 0 0 0 10.025 8a4.486 4.486 0 0 0-1.318-3.182L8 5.525A3.489 3.489 0 0 1 9.025 8 3.49 3.49 0 0 1 8 10.475l.707.707zM6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06z" />
        </svg>
        <div className="answers__container">
          {words.length > 0 && (
          <AudioBtn
            addAnswer={{
              setCorrectAnswers,
              setIncorrectAnswers,
            }}
            correctAnswer={{
              word: words[questionNumber].word,
              audio: words[questionNumber].audio,
              translateWord: words[questionNumber].wordTranslate,
            }}
            text={questions[questionNumber]}
            setQuestionNumber={setQuestionNumber}
          />
          )}
        </div>
      </div>
    </div>
  );
}

export default AudioCallCategory;
