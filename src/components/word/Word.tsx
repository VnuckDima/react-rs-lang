import React, { useEffect, useRef, useState } from 'react';
import useUserActions from '../../hooks/userAction';
import { useTypedSelector } from '../../hooks/useTypeSelector';
import { word } from '../../types/types';
import { HEAD_URL } from '../../utils/API';
import WordButtons from '../wordButtons/WordButtons';

type TWord = {
  data: word;
};

export default function Word({ data }: TWord) {
  const { user, hardWords, learnedWords } = useTypedSelector((state) => state.user);
  const authorizeState = user.message === 'Authenticated';
  const [difficulty, setDifficulty] = useState('выбор');
  const [authorizedUser, setAuthorizedUser] = useState(authorizeState);
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
    if (user.message === 'Authenticated') {
      setAuthorizedUser(true);
    } else {
      setAuthorizedUser(false);
    }
  }, [user.message]);

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
    <section className="textbook__card">
      <div className="card__image" style={{ backgroundImage: `url(${HEAD_URL}/${data.image})` }}>
        <div className="card__header">
          {authorizedUser && (
            <WordButtons data={data} buttonsState={{ difficulty, setDifficulty }} />
          )}
          <button
            className="card__btn"
            onClick={playAudio}
            type="button"
            title="Прослушать карточку"
          >
            u
          </button>
        </div>
        <div className="card__main">
          <div className="card__statistics">{authorizedUser && statisticCount}</div>
          <div className="card__main-info">
            <span className="card__name_bold">{data.word}</span>
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
    </section>
  );
}
