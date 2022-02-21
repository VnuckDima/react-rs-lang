import React from 'react';

type TRoundInfo = {
  questionNumber: number;
  COUNT_QUESTIONS: number;
}

function RoundNumber({ questionNumber, COUNT_QUESTIONS }: TRoundInfo) {
  return (
    <div className="minigame__round">
      Раунд:&nbsp;
      {questionNumber + 1}
      /
      {COUNT_QUESTIONS}
    </div>
  );
}

export default RoundNumber;
