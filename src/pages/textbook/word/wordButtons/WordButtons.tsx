import React from 'react';
import { useDispatch } from 'react-redux';
import { DownloadOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import useUserActions from '../../../../hooks/userAction';
import { useTypedSelector } from '../../../../hooks/useTypeSelector';
import { userType, word } from '../../../../types/types';
import { getSecondClass } from '../../../../utils/utils';

type TWordButtons = {
  word: word;
  buttonsState: { difficulty: string; setDifficulty: (state: string) => void };
};

export default function WordButtons({ word, buttonsState }: TWordButtons) {
  const { user, allWords } = useTypedSelector((state) => state.user);
  const dispatch = useDispatch();
  const { addUserWord, updateWord } = useUserActions();
  const { difficulty, setDifficulty } = buttonsState;

  function toggleDifficulty(wordId: string, newDifficulty: string) {
    if (wordId in allWords) {
      const newOptions = allWords[wordId].userWord.optional;
      if (newDifficulty === 'hard') {
        dispatch({
          type: userType.ADD_HARD_WORD,
          payload: {
            id: user.userId,
            wordId,
            userWord: {
              difficulty,
              optional: newOptions,
            },
          },
        });
      } else {
        dispatch({
          type: userType.ADD_LEARNED_WORD,
          payload: {
            id: user.userId,
            wordId,
            userWord: {
              difficulty,
              optional: newOptions,
            },
          },
        });
      }
      updateWord(user.userId, wordId, newDifficulty, newOptions);
    } else {
      addUserWord(word.id, user.userId, newDifficulty);
    }
  }

  function deleteDifficulty() {
    const oldOptional = allWords[word.id].userWord.optional;
    updateWord(user.userId, word.id, 'newWord', oldOptional);
  }

  function handleAddHardWord() {
    toggleDifficulty(word.id, 'hard');
    setDifficulty('сложных');
  }
  function handleAddLearnedWord() {
    toggleDifficulty(word.id, 'learned');
    setDifficulty('изученных');
  }
  function handleDeleteWord() {
    if (difficulty === 'сложных') {
      dispatch({ type: userType.DELETE_USER_WORD, payload: { wordId: word.id, difficulty: 'hard' } });
    } else {
      dispatch({ type: userType.DELETE_USER_WORD, payload: { wordId: word.id, difficulty: 'learned' } });
    }
    deleteDifficulty();
      // deleteUserWord(word.id, user.userId, 'hard');
     // else {
    //   deleteUserWord(word.id, user.userId, 'learned');
    // }
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
