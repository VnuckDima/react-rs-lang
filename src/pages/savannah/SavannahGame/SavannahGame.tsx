import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import EndGame from '../../../components/EndGame/EndGame';
import { useTypedSelector } from '../../../hooks/useTypeSelector';
import { wordsTypes } from '../../../store/reducers/words';
import { TAnswers, wordExtended } from '../../../types/types';
import {
  soundBroken, soundCorrect, soundsPath,
} from '../../../utils/const';
import { playAudio } from '../../../utils/utils';
import AnswerBtns from '../AnswerBtns/AnswerBtns';
import Question from '../Question/Question';
import RoundNumber from '../RoundNumber/RoundNumber';
import Score from '../Score/Score';

type TSavannahGame = {
  questions: wordExtended[]
}

const COUNT_QUESTIONS = 20;
const ROUND_TIME = 5000;
const SHOW_ANSWERS_TIME = 2000;
let roundTimeout: ReturnType<typeof setTimeout> = setTimeout(() => { });
let showAnswersTimeout: ReturnType<typeof setTimeout> = setTimeout(() => { });
let scoreMultiplier = 1;

export default function SavannahGame({ questions }: TSavannahGame) {
  const { words } = useTypedSelector((state) => state.words);
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
    } else {
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
    playAudio(soundBroken, soundsPath);
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
    playAudio(soundBroken, soundsPath);
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
    clearTimeout(roundTimeout);
    if (text === 'noAnswer') {
      handleNoAnswer();
    } else if (text.includes(questions[questionNumber].wordTranslate)) {
        handleRightAnswer();
      } else {
        handleWrongAnswer();
    }
    setIsDisabled(true);
    setQuestionStart(false);
    showAnswersTimeout = setTimeout(() => nextRound(), SHOW_ANSWERS_TIME);
  };

  useEffect(() => {
    setQuestionStart(true);
    setRightOrWrong('fall');
    return () => {
      dispatch({ type: wordsTypes.RESET_WORDS });
      clearTimeout(showAnswersTimeout);
      clearTimeout(roundTimeout);
    };
  }, []);

  useEffect(() => {
    if (questionNumber < questions.length) {
      roundTimeout = setTimeout(() => handleAnswer('noAnswer'), ROUND_TIME);
    }
  }, [questionNumber]);

  if (questionNumber === COUNT_QUESTIONS) {
    return (
      <EndGame
      answers={{ correctAnswers, incorrectAnswers }}
      />
    );
  }
    return (
    <div className="audiocall">
      <div className="audiocall__container">
        <Score score={score} />
        <RoundNumber questionNumber={questionNumber} COUNT_QUESTIONS={COUNT_QUESTIONS} />
        <Question
          rightOrWrong={rightOrWrong}
          question={questions[questionNumber].word}
          start={questionStart}
        />
        <div className="answers__container">
          <AnswerBtns
          currentQuestion={questions[questionNumber]}
          isDisabled={isDisabled}
          handleAnswer={handleAnswer}
          />
          {/* {questions[questionNumber]
          .answers.map((answer, index) => <AnswerBtns text={`${index + 1}.
          ${answer}`} key={answer} isDisabled={isDisabled} handleAnswer={handleAnswer} />)} */}
        </div>
      </div>
    </div>
  );
}
