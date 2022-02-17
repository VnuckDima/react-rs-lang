import React from 'react';
import { Pagination } from 'antd';
import { games } from '../../../utils/utils';

type TTextbookButtons = {
  pageStateProp: { pageState: number, setPageState: (state: number) => void }
  setGame: (state: string) => void
}

export default function TextbookButtons({ pageStateProp, setGame }: TTextbookButtons) {
  const { pageState, setPageState } = pageStateProp;

  function openGame(name: string) {
    setGame(name);
  }

  return (
  <>
    <Pagination current={pageState} onChange={(page) => setPageState(page)} total={300} />
    <button onClick={() => openGame(games.AUDIO_CALL)} type="button">audio game</button>
    <button onClick={() => openGame(games.SPRINT)} type="button">sprint game</button>
    <button onClick={() => openGame(games.SAVANNAH)} type="button">savannah game</button>
  </>
  );
}
