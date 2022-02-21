import React from 'react';

type TScore = {
  score: number;
}

export default function Score({ score }: TScore) {
  return (
    <div className="minigame__score">
      Счет:&nbsp;
      {score}
    </div>
  );
}
