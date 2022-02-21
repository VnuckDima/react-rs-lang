import React from 'react';

type TTimer = {
  timer: number;
}

export default function Timer({ timer }: TTimer) {
  return (
    <div className="minigame__timer">{timer}</div>
  );
}
