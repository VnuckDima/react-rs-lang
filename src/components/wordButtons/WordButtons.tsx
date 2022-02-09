import React from 'react';
import { DownloadOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import useUserActions from '../../hooks/userAction';
import { useTypedSelector } from '../../hooks/useTypeSelector';
import { word } from '../../types/types';
import { getSecondClass } from '../../utils/utils';

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
    setDifficulty('сложных');
  }
  function handleAddLearnedWord() {
    addUserWord(data.id, user.userId, 'learned');
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
      <Button
      className={`card__btns-${getSecondClass(difficulty)}_delete`}
        type="primary"
        onClick={() => handleDeleteWord()}
        shape="round"
        size="large"
      >
        Удалить из
        {` ${difficulty} `}
        слов
      </Button>
    );
  }

  return (
    <div className="card__btns-left">
      <Button className="card__btns-hard" type="primary" onClick={() => handleAddHardWord()} shape="round" size="large">
        Cложное
      </Button>
      <Button className="card__btns-learned" type="primary" onClick={() => handleAddLearnedWord()} shape="round" size="large">
        Изученное
      </Button>
    </div>
  );
}
