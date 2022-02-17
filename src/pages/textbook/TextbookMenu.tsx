import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Preloader from '../../components/Preloader/Preloader';
import useUserActions from '../../hooks/userAction';
import { useTypedSelector } from '../../hooks/useTypeSelector';
import useWordsActions from '../../hooks/useWordsAction';
import { wordsTypes } from '../../store/reducers/words';
import { userType } from '../../types/types';
import { games } from '../../utils/utils';
import LoadGame from './LoadGame/LoadGame';
import TextBook from './TextBookPage/TextBook';

function TextbookMenu() {
  const { user, isLoadedUserData } = useTypedSelector((state) => state.user);
  const { isLoadedWords } = useTypedSelector((state) => state.words);
  const { loadWords } = useWordsActions();
  const dispatch = useDispatch();
  const [authorizedUser, setAuthorizedUser] = useState(false);
  const [isGame, setIsGame] = useState(false);
  const [pageState, setPageState] = useState(1);
  const [group, setGroup] = useState(0);
  const [game, setGame] = useState<string>(games.NONE);

  useEffect(() => {
    loadWords(0, 0);
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
    // dispatch({ type: wordsTypes.RESET_WORDS });
    return <LoadGame gameOptions={{ group, pageState, game }} />;
  }
  return (
    <TextBook
      authorizedUser={authorizedUser}
      setGame={setGame}
      pageStateProp={{ pageState, setPageState }}
    />
  );
}

export default TextbookMenu;
