import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTypedSelector } from '../../hooks/useTypeSelector';
import useWordsActions from '../../hooks/useWordsAction';
import Word from '../word/Word';

function Textbook() {
  const words = useTypedSelector((state) => state.words);
  const { loadWords } = useWordsActions();
  useEffect(() => {
    loadWords(0, 0);
  }, []);
  return (
    <div className="cards__container">
      {words.map((word) => <Word data={word} key={word.id} />)}
    </div>
  );
}

export default Textbook;
