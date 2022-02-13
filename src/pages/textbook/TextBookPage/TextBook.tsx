import { Pagination } from 'antd';
import React, { useEffect, useState } from 'react';
import useUserActions from '../../../hooks/userAction';
import { useTypedSelector } from '../../../hooks/useTypeSelector';
import useWordsActions from '../../../hooks/useWordsAction';
import TextbookButtons from '../TextbookButtons/TextbookButtons';
import Word from '../word/Word';

type TTextBook = {
  setGame: (state: string) => void
  pageStateProp: { pageState: number, setPageState: (state: number) => void }
  authorizedUser: boolean
}

export default function TextBook({ setGame, pageStateProp, authorizedUser }: TTextBook) {
  const { user } = useTypedSelector((state) => state.user);
  const { words } = useTypedSelector((state) => state.words);
  const { loadWords } = useWordsActions();
  const { pageState, setPageState } = pageStateProp;

  useEffect(() => {
    loadWords(pageState - 1, 0);
  }, [pageState]);

  return (
    <main className="textbook">
      <div className="textbook__wrapper">
        <TextbookButtons pageStateProp={{ pageState, setPageState }} setGame={setGame} />
        <div className="cards__container">
          {words.map((word) => <Word data={word} key={word.id} authorizedUser={authorizedUser} />)}
        </div>
        <Pagination current={pageState} onChange={(page) => setPageState(page)} total={300} />
      </div>
    </main>
  );
}
