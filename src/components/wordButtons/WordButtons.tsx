import React from 'react';
import useUserActions from '../../hooks/userAction';
import { useTypedSelector } from '../../hooks/useTypeSelector';
import { word } from '../../types/types';

type TWordButtons = {
  data: word;
  buttonsState: { difficulty: string; setDifficulty: (state: string) => void };
};

export default function WordButtons({ data, buttonsState }: TWordButtons) {
  const { user, hardWords, learnedWords } = useTypedSelector((state) => state.user);
  const { addUserWord, deleteUserWord } = useUserActions();
  const { difficulty, setDifficulty } = buttonsState;

  function handleAddHardWord() {
    addUserWord(data.id, user.userId, 'hard');
    console.log(hardWords);
    setDifficulty('сложных');
  }
  function handleAddLearnedWord() {
    addUserWord(data.id, user.userId, 'learned');
    console.log(learnedWords);
    setDifficulty('изученных');
  }
  function handleDeleteWord() {
    if (difficulty === 'сложных') {
      deleteUserWord(data.id, user.userId, 'hard');
    } else {
      deleteUserWord(data.id, user.userId, 'learned');
    }
    setDifficulty('none');
  }

  if (difficulty === 'сложных' || difficulty === 'изученных') {
    return (
      <button
        className="card__hard-word_add"
        onClick={handleDeleteWord}
        type="button"
        title="Добавить в сложные слова"
      >
        Удалить из
        {` ${difficulty} `}
        слов
      </button>
    );
  }

  return (
    <div className="card__btns-left">
      <button
        className="card__hard-word_add"
        onClick={handleAddHardWord}
        type="button"
        title="Добавить в сложные слова"
      >
        Cложное
      </button>
      <button
        className="card__learned-word_add"
        onClick={handleAddLearnedWord}
        type="button"
        title="Добавить в изученные слова"
      >
        Изученное
      </button>
    </div>
  );
}
