import React, { useRef } from 'react';
import useUserActions from '../../hooks/userAction';
import { useTypedSelector } from '../../hooks/useTypeSelector';
import { word } from '../../types/types';
import { HEAD_URL } from '../../utils/API';

type TWord = {
  data: word
}

export default function Word({ data }: TWord) {
  const { user } = useTypedSelector((state) => state.user);
  const { addHardWord } = useUserActions();
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

  function handleAddHardWord() {
    addHardWord(data.id, user.userId, { difficulty: 'hard' });
  }

  return (
  <section className="textbook__card">
    <div
      className="card__image"
      style={{ backgroundImage: `url(${HEAD_URL}/${data.image})` }}
    >
      <div className="card__header">
        <div className="card__btns-left">
          <button className="card__hard-word_add" onClick={handleAddHardWord} type="button" title="Добавить в сложные слова">Cложное</button>
          <button className="card__learned-word_add" type="button" title="Добавить в изученные слова">Изученное</button>
        </div>
        <button className="card__btn" onClick={playAudio} type="button" title="Прослушать карточку">Play</button>
      </div>
      <div className="card__main">
        <div className="card__main-info">
          <span className="card__name_bold">{data.word}</span>
          <span>{data.transcription}</span>
          <span className="card__name_translate">{data.wordTranslate}</span>
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
