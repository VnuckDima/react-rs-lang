import React from 'react';

type TScore = {
  score: number;
}

export default function Score({ score }: TScore) {
  return (
    <div>
      Score:&nbsp;
      {score}
    </div>
  );
}
