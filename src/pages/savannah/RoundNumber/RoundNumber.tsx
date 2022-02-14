import React from 'react';

type TRoundInfo = {
  questionNumber: number;
  COUNT_QUESTIONS: number;
}

function RoundNumber({ questionNumber, COUNT_QUESTIONS }: TRoundInfo) {
  return (
    <h1>
      Раунд:&nbsp;
      {questionNumber + 1}
      /
      {COUNT_QUESTIONS}
    </h1>
  );
}

export default RoundNumber;
