import React from 'react';
import { useDispatch } from 'react-redux';
import { DownloadOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import useUserActions from '../../../../hooks/userAction';
import { useTypedSelector } from '../../../../hooks/useTypeSelector';
import { IStatistic, userType, word } from '../../../../types/types';
import { getSecondClass } from '../../../../utils/utils';
import { updateUserStatistic } from '../../../../utils/API';
import useWordsActions from '../../../../hooks/useWordsAction';

type TWordButtons = {
  word: word;
  buttonsState: { difficulty: string; setDifficulty: (state: string) => void };
  selectedCategory: number
};

export default function WordButtons({ word, buttonsState, selectedCategory }: TWordButtons) {
  const { user, allWords } = useTypedSelector((state) => state.user);
  const dispatch = useDispatch();
  const { loadHardWords } = useWordsActions();
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
      updateWord(user.userId, wordId, newDifficulty, true, newOptions);
    } else {
      addUserWord(word.id, user.userId, newDifficulty);
    }
  }

  function deleteDifficulty() {
    const oldOptional = allWords[word.id].userWord.optional;
    updateWord(user.userId, word.id, 'newWord', true, oldOptional);
  }

  function handleAddHardWord() {
    toggleDifficulty(word.id, 'hard');
    setDifficulty('сложных');
  }
  function handleAddLearnedWord() {
    const data: IStatistic = {
      learnedWords: 1,
      optional: {
        allTimeStat: { games: [] },
        oneDayStats: {
          newWords: 0,
          learned: 1,
          games: [],
        },
      },
    };
    toggleDifficulty(word.id, 'learned');
    updateUserStatistic(user.userId, data);
    setDifficulty('изученных');
  }
  function handleDeleteWord() {
    if (difficulty === 'сложных') {
      if (selectedCategory === 6) {
        loadHardWords(user.userId);
      }
      dispatch({ type: userType.DELETE_USER_WORD, payload: { wordId: word.id, difficulty: 'hard' } });
    } else {
      dispatch({ type: userType.DELETE_USER_WORD, payload: { wordId: word.id, difficulty: 'learned' } });
    }
    deleteDifficulty();
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
