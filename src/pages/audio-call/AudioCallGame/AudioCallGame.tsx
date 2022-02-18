import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import EndGame from '../../../components/EndGame/EndGame';
import { useTypedSelector } from '../../../hooks/useTypeSelector';
import { wordsTypes } from '../../../store/reducers/words';
import { TAnswers, word, wordExtended } from '../../../types/types';
import { HEAD_URL } from '../../../utils/API';
import { playAudio } from '../../../utils/utils';
import AnswerBtns from '../../../components/AnswerBtns/AnswerBtns';
import Question from '../Question/Question';
import { soundCorrect, soundIncorrect, soundsPath } from '../../../utils/const';
import Score from '../../../components/Score/Score';
import RoundNumber from '../../../components/RoundNumber/RoundNumber';

type TAudioCall = {
  questions: wordExtended[]
}

let scoreMultiplier = 1;
let showAnswersTimeout: ReturnType<typeof setTimeout> = setTimeout(() => { });
const SHOW_ANSWERS_TIME = 2000;

export default function AudioCallGame({ questions } : TAudioCall) {
  const dispatch = useDispatch();
  const [correctAnswers, setCorrectAnswers] = useState<TAnswers[]>([]);
  const [incorrectAnswers, setIncorrectAnswers] = useState<TAnswers[]>([]);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [questionStart, setQuestionStart] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [rightOrWrong, setRightOrWrong] = useState('');
  const [score, setScore] = useState(0);

  function updateScore(isRightAnswer: boolean): void {
    if (isRightAnswer) {
      setScore(score + (30 * scoreMultiplier));
      scoreMultiplier += 0.1;
    } else if (scoreMultiplier > 0.1) {
     scoreMultiplier -= 0.1;
    }
  }

  function handleRightAnswer() {
    const correctAnswer = {
      word: questions[questionNumber].word,
      audio: questions[questionNumber].audio,
      translateWord: questions[questionNumber].wordTranslate,
    };
    setCorrectAnswers((state) => [...state, correctAnswer]);
    setRightOrWrong('right');
    playAudio(soundCorrect, soundsPath);
    updateScore(true);
  }

  function handleWrongAnswer() {
    const incorrectAnswer = {
      word: questions[questionNumber].word,
      audio: questions[questionNumber].audio,
      translateWord: questions[questionNumber].wordTranslate,
    };
    setIncorrectAnswers((state) => [...state, incorrectAnswer]);
    setRightOrWrong('wrong');
    playAudio(soundIncorrect, soundsPath);
    updateScore(false);
  }

  function handleNoAnswer() {
    const incorrectAnswer = {
      word: questions[questionNumber].word,
      audio: questions[questionNumber].audio,
      translateWord: questions[questionNumber].wordTranslate,
    };
    setIncorrectAnswers((state) => [...state, incorrectAnswer]);
    setRightOrWrong('broken');
    playAudio(soundIncorrect, soundsPath);
  }

  function nextRound() {
    setRightOrWrong(' ');
    setQuestionNumber((state) => state + 1);
    clearTimeout(showAnswersTimeout);
    setIsDisabled(false);
    setQuestionStart(true);
    setRightOrWrong('fall');
  }

  const handleAnswer = (text: string, wordId: string):void => {
    if (text === 'noAnswer') {
      handleNoAnswer();
    } else if (text.includes(questions[questionNumber].wordTranslate)) {
        handleRightAnswer();
        // changeStatistic(user.userId, wordId, true);
      } else {
        handleWrongAnswer();
        // changeStatistic(user.userId, wordId, false);
    }
    setIsDisabled(true);
    setQuestionStart(false);
    showAnswersTimeout = setTimeout(() => nextRound(), SHOW_ANSWERS_TIME);
  };

  useEffect(() => () => {
    dispatch({ type: wordsTypes.RESET_WORDS });
  }, []);

  useEffect(() => {
    if (questionNumber < questions.length) {
      setTimeout(() => playAudio(questions[questionNumber].audio, HEAD_URL), 300);
    }
  }, [questionNumber]);

  if (questionNumber === questions.length) {
    return (
      <EndGame
      answers={{ correctAnswers, incorrectAnswers }}
      score={score}
      />
    );
  }
  return (
    <div className="audiocall">
      <div className="audiocall__container">
        <Score score={score} />
        <RoundNumber questionNumber={questionNumber} COUNT_QUESTIONS={questions.length} />
        <Question questionAudio={questions[questionNumber].audio} />
        <div className="answers__container">
        <AnswerBtns
          currentQuestion={questions[questionNumber]}
          isDisabled={isDisabled}
          handleAnswer={handleAnswer}
        />
        </div>
      </div>
    </div>
  );
}
