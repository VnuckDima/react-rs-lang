import React from 'react';

type TQuestion = {
  question: string;
}

export default function Question({ question }: TQuestion) {
  return (
    <div>
      <h1>{question}</h1>
    </div>
  );
}
