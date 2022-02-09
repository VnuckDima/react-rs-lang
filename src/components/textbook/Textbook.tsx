import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination } from 'antd';
import useUserActions from '../../hooks/userAction';
import { useTypedSelector } from '../../hooks/useTypeSelector';
import useWordsActions from '../../hooks/useWordsAction';
import Word from '../word/Word';
import { userType } from '../../types/types';

function Textbook() {
  const { words } = useTypedSelector((state) => state.words);
  const { user, isLoaded } = useTypedSelector((state) => state.user);
  const dispatch = useDispatch();
  const { uploadUserWords } = useUserActions();
  const { loadWords } = useWordsActions();
  const [pageState, setPageState] = useState(1);
  const [authorizedUser, setAuthorizedUser] = useState(false);
  useEffect(() => {
    loadWords(0, 0);
    if (user.message === 'Authenticated') {
      setAuthorizedUser(true);
    } else {
      dispatch({ type: userType.END_LOADING });
    }
  }, []);

  useEffect(() => {
    if (user.message === 'Authenticated') {
      uploadUserWords(user.userId);
      setAuthorizedUser(true);
    } else {
      setAuthorizedUser(false);
    }
  }, [user.message]);

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

  function openGame() {
    console.log('open');
  }

  return (
    <main className="textbook">
      <div className="textbook__wrapper">
        <Pagination current={pageState} onChange={(page) => setPageState(page)} total={300} />
        <button onClick={openGame} type="button">audio game</button>
        <div className="cards__container">
          {words.map((word) => (
            <Word data={word} key={word.id} authorizedUser={authorizedUser} />
          ))}
        </div>
        <Pagination current={pageState} onChange={(page) => setPageState(page)} total={300} />
      </div>
    </main>
  );
}

export default Textbook;
