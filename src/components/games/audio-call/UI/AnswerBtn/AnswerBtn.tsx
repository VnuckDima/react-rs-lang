import React from 'react';

type TText = {
  text: string
}

function AnswerBtn({ text }: TText) {
  return (
    <button type="button">{text}</button>
  );
}

export default AnswerBtn;
