import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';

type TQuestion = {
  question: string;
  start: boolean;
  rightOrWrong: string
}

export default function Question({ question, start, rightOrWrong }: TQuestion) {
  return (
      <div className={`savannah__question-container ${rightOrWrong}`}>
        <CSSTransition in={start} timeout={2000} classNames="savannah__question" mountOnEnter unmountOnExit>
          <div data-name={question} className={`savannah__question ${rightOrWrong}`}>{question}</div>
        </CSSTransition>
      </div>
  );
}

// export default function Question({ question, start, rightOrWrong }: TQuestion) {
//   return (
//     <div className={`savannah__question-container ${rightOrWrong}`}>
//       <CSSTransition in={start} timeout={2000}
// classNames="savannah__question" mountOnEnter unmountOnExit>
//         <div data-name={question} className="savannah__question">{question}</div>
//       </CSSTransition>
//     </div>
//   );
// }
