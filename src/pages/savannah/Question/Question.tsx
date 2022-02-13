import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';

type TQuestion = {
  question: string;
  start: boolean;
}

export default function Question({ question, start }: TQuestion) {
  return (
    <div className="savannah__question-container">
      <CSSTransition in={start} timeout={2000} classNames="savannah__question" mountOnEnter unmountOnExit>
        <div data-name={question} className="savannah__question">{question}</div>
      </CSSTransition>
    </div>
  );
}
