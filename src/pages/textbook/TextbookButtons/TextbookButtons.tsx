import React, { useState } from 'react';
import { Pagination } from 'antd';
import { games } from '../../../utils/utils';
import CategorySelect from '../../../components/CategorySelect/CategorySelect';

type TTextbookButtons = {
  pageStateProp: { pageState: number, setPageState: (state: number) => void }
  setGame: (state: string) => void
  category: { selectedCategory: number, setSelectedCategory: (state: number) => void }
  authorizedUser: boolean
}

export default function TextbookButtons({
  pageStateProp,
  setGame,
  category,
  authorizedUser,
}: TTextbookButtons) {
  const { pageState, setPageState } = pageStateProp;
  const arrayButtons = [0, 1, 2, 3, 4, 5];
  function openGame(name: string) {
    setGame(name);
  }

  return (
  <div className="textbook__top-wrapper">
    <div className="textbook__games">
      <button onClick={() => openGame(games.AUDIO_CALL)} type="button">Аудиовызов</button>
      <button onClick={() => openGame(games.SPRINT)} type="button">Спринт</button>
      <button onClick={() => openGame(games.SAVANNAH)} type="button">Саванна</button>
    </div>
    {category.selectedCategory === 6
      ? <div />
      : <Pagination current={pageState} onChange={(page) => setPageState(page)} total={300} />}
    <div className="textbook__category-button">
    {arrayButtons.map((button, ind) => <button className={category.selectedCategory === ind ? 'category__select-button active__button' : 'category__select-button'} key={button} onClick={() => category.setSelectedCategory(ind)} type="button">{ind + 1}</button>)}
    {authorizedUser && <button className="category__select-button" onClick={() => category.setSelectedCategory(6)} type="button">{7}</button>}
    </div>
  </div>
  );
}
