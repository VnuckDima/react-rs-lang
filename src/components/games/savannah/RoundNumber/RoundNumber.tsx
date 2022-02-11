import React from 'react';

type TRoundInfo = {
  questionNumber: number;
  numberOfQuestions: number;
}

function RoundNumber({ questionNumber, numberOfQuestions }: TRoundInfo) {
  return (
    <h1>
      Раунд:&nbsp;
      {questionNumber + 1}
      /
      {numberOfQuestions}
    </h1>
  );
}

export default RoundNumber;
