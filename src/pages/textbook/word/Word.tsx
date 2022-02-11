import React, { useEffect, useRef, useState } from 'react';
import useUserActions from '../../../hooks/userAction';
import { useTypedSelector } from '../../../hooks/useTypeSelector';
import { word } from '../../../types/types';
import { HEAD_URL } from '../../../utils/API';
import { getSecondClass } from '../../../utils/utils';
import WordButtons from './wordButtons/WordButtons';

type TWord = {
  data: word;
  authorizedUser: boolean
};

export default function Word({ data, authorizedUser }: TWord) {
  const { user, hardWords, learnedWords } = useTypedSelector((state) => state.user);
  const [difficulty, setDifficulty] = useState('выбор');
  // const sounds = [data.audio, data.audioExample, data.audioMeaning];
  function playAudio() {
    const audio = new Audio(`${HEAD_URL}/${data.audio}`);
    console.log(audio.duration);
    audio.volume = 0.5;
    audio.play();
    /* let firstmus = audioStart;
    firstmus += 1;
     setTimeout(() => playAudio(firstmus), audio.duration); */
  }

  useEffect(() => {
    if (data.id in hardWords) {
      setDifficulty('сложных');
    }
    if (data.id in learnedWords) {
      setDifficulty('изученных');
    }
  }, []);

  const statisticCount = (
    <>
      <div className="statistics-count wrong-answers-count" title="Неправильных ответов">
        0
      </div>
      <div className="statistics-count right-answers-count" title="Правильных ответов">
        0
      </div>
    </>
  );

  return (
  <div className={authorizedUser ? `textbook__card ${getSecondClass(difficulty)}` : 'textbook__card'}>
    <div className="card__image" style={{ backgroundImage: `linear-gradient(transparent, rgba(255, 255, 255, 1)), url(${HEAD_URL}/${data.image})` }}>
    <div className="card__header">
      {authorizedUser && (
        <WordButtons data={data} buttonsState={{ difficulty, setDifficulty }} />
      )}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        onClick={playAudio}
        className="bi bi-volume-up-fill"
        viewBox="0 0 16 16"
      >
        <path d="M11.536 14.01A8.473 8.473 0 0 0 14.026 8a8.473 8.473 0 0 0-2.49-6.01l-.708.707A7.476 7.476 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303l.708.707z" />
        <path d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.483 5.483 0 0 1 11.025 8a5.483 5.483 0 0 1-1.61 3.89l.706.706z" />
        <path d="M8.707 11.182A4.486 4.486 0 0 0 10.025 8a4.486 4.486 0 0 0-1.318-3.182L8 5.525A3.489 3.489 0 0 1 9.025 8 3.49 3.49 0 0 1 8 10.475l.707.707zM6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06z" />
      </svg>
    </div>
    <div className="card__main">
      <div className="card__statistics">{authorizedUser && statisticCount}</div>
      <div className="card__main-info">
        <span className="card__name_bold">{`${data.word} `}</span>
        <span>{data.transcription}</span>
        <div>
          <span className="card__name_translate">{data.wordTranslate}</span>
        </div>
      </div>
    </div>
    </div>
    <div className="card__footer">
      <div className="card__examples_first">
        <p>{data.textMeaning}</p>
        <p className="card__examples-text">{data.textMeaningTranslate}</p>
      </div>
      <div className="card__examples_seconds">
        <p>{data.textExample}</p>
        <p className="card__examples-text">{data.textExampleTranslate}</p>
      </div>
    </div>
  </div>
  );
}
