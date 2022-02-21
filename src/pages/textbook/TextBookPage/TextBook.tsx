import { Pagination } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import useUserActions from '../../../hooks/userAction';
import { useTypedSelector } from '../../../hooks/useTypeSelector';
import useWordsActions from '../../../hooks/useWordsAction';
import { wordsTypes } from '../../../store/reducers/words';
import { getUserHardWords } from '../../../utils/API';
import { saveLSBeforeUnload } from '../../../utils/utils';
import TextbookButtons from '../TextbookButtons/TextbookButtons';
import Word from '../word/Word';

type TTextBook = {
  setGame: (state: string) => void
  pageStateProp: { pageState: number, setPageState: (state: number) => void }
  authorizedUser: boolean
  category: { selectedCategory: number, setSelectedCategory: (state: number) => void }
}

export default function TextBook({
  setGame,
  pageStateProp,
  authorizedUser,
  category,
}: TTextBook) {
  const { words } = useTypedSelector((state) => state.words);
  const { user, hardWords } = useTypedSelector((state) => state.user);
  const { loadWords, loadHardWords } = useWordsActions();
  const { pageState, setPageState } = pageStateProp;
  const { selectedCategory, setSelectedCategory } = category;

  useEffect(() => {
    if (selectedCategory === 6) {
      loadHardWords(user.userId);
    } else {
      loadWords(pageState - 1, selectedCategory);
    }
    saveLSBeforeUnload(pageState, selectedCategory);
  }, [pageState, selectedCategory]);

  return (
    <main className="textbook">
      <div className="textbook__wrapper">
        <h1 className="textbook__header">Учебник</h1>
        <TextbookButtons
          authorizedUser={authorizedUser}
          category={{ selectedCategory, setSelectedCategory }}
          pageStateProp={{ pageState, setPageState }}
          setGame={setGame}
        />
        <div className="cards__container">
          {words.map((word) => (
            <Word
              data={word}
              key={word.id}
              authorizedUser={authorizedUser}
              selectedCategory={selectedCategory}
            />
          ))}
        </div>
        {selectedCategory === 6
          ? <div />
          : <Pagination current={pageState} onChange={(page) => setPageState(page)} total={300} />}
      </div>
    </main>
  );
}
