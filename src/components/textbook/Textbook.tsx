import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Pagination } from 'antd';
import useUserActions from '../../hooks/userAction';
import { useTypedSelector } from '../../hooks/useTypeSelector';
import useWordsActions from '../../hooks/useWordsAction';
import Word from '../word/Word';

function Textbook() {
  const { words } = useTypedSelector((state) => state.words);
  const { user, hardWords, learnedWords } = useTypedSelector((state) => state.user);
  const { uploadUserWords } = useUserActions();
  const { loadWords } = useWordsActions();
  const [isLoaded, setIsLoaded] = useState(false);
  const [pageState, setPageState] = useState(1);
  useEffect(() => {
    console.log('first');
    loadWords(0, 0);
    uploadUserWords(user.userId, 'hard');
    uploadUserWords(user.userId, 'learned');
  }, []);

  useEffect(() => {
    if (Object.values(learnedWords).length > 0) {
      setIsLoaded(true);
    }
  }, [learnedWords]);

  useEffect(() => {
    loadWords(pageState - 1, 0);
  }, [pageState]);

  if (!isLoaded) {
    return (
      <div id="preloader">
        <div id="loader" />
      </div>
    );
  }

  return (
    <main className="textbook">
      <div className="textbook__wrapper">
        <Pagination current={pageState} onChange={(page) => setPageState(page)} total={300} />
        <div className="cards__container">
          {words.map((word) => (
            <Word data={word} key={word.id} />
          ))}
        </div>
      </div>
    </main>
  );
}

export default Textbook;
