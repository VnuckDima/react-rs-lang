import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import EndGame from '../../../components/EndGame/EndGame';
import RoundNumber from '../../../components/RoundNumber/RoundNumber';
import Score from '../../../components/Score/Score';
import Timer from '../../../components/Timer/Timer';
import { useTypedSelector } from '../../../hooks/useTypeSelector';
import { wordsTypes } from '../../../store/reducers/words';
import { TAnswers, wordExtended } from '../../../types/types';
import {
  soundBroken, soundCorrect, soundsPath,
} from '../../../utils/const';
import { playAudio, randomNum } from '../../../utils/utils';
import AnswerBtns from '../AnswerBtns/AnswerBtns';
import Question from '../Question/Question';

type TSprintGame = {
  questions: wordExtended[]
}

const COUNT_QUESTIONS = 20;
const SHOW_ANSWERS_TIME = 2000;
const GAME_TIME = 60;
let showAnswersTimeout: ReturnType<typeof setTimeout> = setTimeout(() => { });
let scoreMultiplier = 1;
let randomTranslation = '';

export default function SprintGame({ questions }: TSprintGame) {
  const { words } = useTypedSelector((state) => state.words);
  const dispatch = useDispatch();
  const [correctAnswers, setCorrectAnswers] = useState<TAnswers[]>([]);
  const [incorrectAnswers, setIncorrectAnswers] = useState<TAnswers[]>([]);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [questionStart, setQuestionStart] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [rightOrWrong, setRightOrWrong] = useState('');
  const [score, setScore] = useState(0);
  const [equality, setEquality] = useState('=');
  const [timer, setTimer] = useState(GAME_TIME);

  function handleTimer() {
    setTimer(timer - 1);
    if (timer > 0) {
      setTimeout(() => handleTimer(), 1000);
    }
  }

  function generateRandomTranslation() {
    const randomNumber = Math.random() * 100;
    if (randomNumber <= 50) {
      randomTranslation = questions[questionNumber].wordTranslate;
    } else {
      [randomTranslation] = questions[questionNumber].answers
      .filter((el) => el !== questions[questionNumber].wordTranslate);
    }
  }

  function updateEquality() {
    if (randomTranslation !== questions[questionNumber].wordTranslate) {
      setEquality('<>');
    } else {
      setEquality('=');
    }
  }

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
    updateEquality();
  }

  function handleWrongAnswer() {
    const incorrectAnswer = {
      word: questions[questionNumber].word,
      audio: questions[questionNumber].audio,
      translateWord: questions[questionNumber].wordTranslate,
    };
    setIncorrectAnswers((state) => [...state, incorrectAnswer]);
    setRightOrWrong('wrong');
    playAudio(soundBroken, soundsPath);
    updateScore(false);
    updateEquality();
  }

  function nextRound() {
    setRightOrWrong(' ');
    setQuestionNumber((state) => state + 1);
    clearTimeout(showAnswersTimeout);
    setIsDisabled(false);
    setQuestionStart(true);
    setRightOrWrong('fall');
  }

  const handleAnswer = (text: string):void => {
    if ((randomTranslation === questions[questionNumber].wordTranslate && text === 'Верно') || (randomTranslation !== questions[questionNumber].wordTranslate && text !== 'Верно')) {
      handleRightAnswer();
    } else {
      handleWrongAnswer();
    }
    setIsDisabled(true);
    setQuestionStart(false);
    showAnswersTimeout = setTimeout(() => nextRound(), SHOW_ANSWERS_TIME);
  };

  useEffect(() => {
    setTimeout(() => handleTimer(), 1000);
    setQuestionStart(true);
    setRightOrWrong('fall');
    return () => {
      dispatch({ type: wordsTypes.RESET_WORDS });
      clearTimeout(showAnswersTimeout);
    };
  }, []);

  useEffect(() => {
    generateRandomTranslation();
    updateEquality();
  }, [questionNumber]);

  if (questionNumber === COUNT_QUESTIONS) {
    return (
      <EndGame
      answers={{ correctAnswers, incorrectAnswers }}
      score={score}
      />
    );
  }
    return (
    <div className="sprint">
      <div className="sprint__container">
        <Score score={score} />
        <Timer timer={timer} />
        <Question
          rightOrWrong={rightOrWrong}
          question={questions[questionNumber].word}
          equality={equality}
          randomTranslation={randomTranslation}
        />
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
