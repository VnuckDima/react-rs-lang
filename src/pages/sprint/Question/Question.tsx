import React, { useEffect, useState } from 'react';

type TQuestion = {
  question: string;
  randomTranslation: string;
  equality: string;
  rightOrWrong: string
}

export default function Question({
  question,
  equality,
  randomTranslation,
  rightOrWrong,
}: TQuestion) {
  return (
      <div className={`sprint__question-container ${rightOrWrong}`}>
        <span className="sprint__question">
          {question}
          &nbsp;
        </span>
        <span className={rightOrWrong}>{equality}</span>
        <span className="sprint__translation">
          &nbsp;
          {randomTranslation}
        </span>
      </div>
  );
}
