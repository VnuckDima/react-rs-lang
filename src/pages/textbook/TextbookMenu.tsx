import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Footer from '../../components/footer/Footer';
import Preloader from '../../components/Preloader/Preloader';
import useUserActions from '../../hooks/userAction';
import { useTypedSelector } from '../../hooks/useTypeSelector';
import useWordsActions from '../../hooks/useWordsAction';
import { wordsTypes } from '../../store/reducers/words';
import { userType } from '../../types/types';
import { games, saveLSBeforeUnload } from '../../utils/utils';
import LoadGame from './LoadGame/LoadGame';
import TextBook from './TextBookPage/TextBook';

function TextbookMenu() {
  const initialOptions = JSON.parse(localStorage.getItem('lastTextbookPage')!);
  const initialPage = initialOptions ? initialOptions.page : 1;
  const initialCategory = initialOptions ? initialOptions.category : 0;
  const { user, isLoadedUserData } = useTypedSelector((state) => state.user);
  const { isLoadedWords } = useTypedSelector((state) => state.words);
  const { loadWords } = useWordsActions();
  const dispatch = useDispatch();
  const [authorizedUser, setAuthorizedUser] = useState(false);
  const [isGame, setIsGame] = useState(false);
  const [pageState, setPageState] = useState(initialPage);
  const [game, setGame] = useState<string>(games.NONE);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  useEffect(() => {
    loadWords(pageState, selectedCategory);
    if (user.message === 'Authenticated') {
      setAuthorizedUser(true);
    } else {
      dispatch({ type: userType.END_LOADING });
    }
    return () => {
      dispatch({ type: wordsTypes.RESET_WORDS });
    };
  }, []);

  useEffect(() => {
    if (user.message === 'Authenticated') {
      setAuthorizedUser(true);
    } else {
      setAuthorizedUser(false);
    }
  }, [user.message]);

  if (!isLoadedUserData || !isLoadedWords) {
    return <Preloader />;
  }

  if (game !== games.NONE) {
    return <LoadGame gameOptions={{ selectedCategory, pageState, game }} />;
  }
  return (
    <>
    <div className="main__container">
      <div className="wrapper">
        <TextBook
          category={{ selectedCategory, setSelectedCategory }}
          authorizedUser={authorizedUser}
          setGame={setGame}
          pageStateProp={{ pageState, setPageState }}
        />
      </div>
    </div>
    <Footer />
    </>
  );
}

export default TextbookMenu;
