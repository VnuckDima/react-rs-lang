import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import EndGame from '../../../components/EndGame/EndGame';
import { useTypedSelector } from '../../../hooks/useTypeSelector';
import { wordsTypes } from '../../../store/reducers/words';
import { TAnswers, wordExtended } from '../../../types/types';
import { soundCorrect, soundIncorrect, soundsPath } from '../../../utils/const';
import { playAudio } from '../../../utils/utils';
import AnswerBtns from '../AnswerBtns/AnswerBtns';
import Question from '../Question/Question';
import RoundNumber from '../RoundNumber/RoundNumber';

type TSavannahGame = {
  questions: wordExtended[]
}

const COUNT_QUESTIONS = 20;
const ROUND_TIME = 3000;
const SHOW_ANSWERS_TIME = 2000;
let roundTimeout: ReturnType<typeof setTimeout> = setTimeout(() => { });
let showAnswersTimeout: ReturnType<typeof setTimeout> = setTimeout(() => { });

export default function SavannahGame({ questions }: TSavannahGame) {
  const { words } = useTypedSelector((state) => state.words);
  const dispatch = useDispatch();
  const [correctAnswers, setCorrectAnswers] = useState<TAnswers[]>([]);
  const [incorrectAnswers, setIncorrectAnswers] = useState<TAnswers[]>([]);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [questionStart, setQuestionStart] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [rightOrWrong, setRightOrWrong] = useState('');

  function handleRightAnswer() {
    const correctAnswer = {
      word: questions[questionNumber].word,
      audio: questions[questionNumber].audio,
      translateWord: questions[questionNumber].wordTranslate,
    };
    setCorrectAnswers((state) => [...state, correctAnswer]);
    setRightOrWrong('right');
    playAudio(soundCorrect, soundsPath);
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
  }

  function nextRound() {
    setRightOrWrong(' ');
    clearTimeout(showAnswersTimeout);
    setIsDisabled(false);
    setQuestionStart(true);
    setQuestionNumber((state) => state + 1);
    setRightOrWrong('fall');
  }

  const handleAnswer = (text: string):void => {
    clearTimeout(roundTimeout);
    if (text.includes(questions[questionNumber].wordTranslate)) {
      handleRightAnswer();
    } else {
      handleWrongAnswer();
    }
    setIsDisabled(true);
    setQuestionStart(false);
    showAnswersTimeout = setTimeout(() => nextRound(), SHOW_ANSWERS_TIME);
  };

  function handleNoAnswer() {
    handleAnswer('wrong');
  }

  function handleAnswerKeypress(key: string) {
    switch (key) {
      case '1':
        handleAnswer(questions[questionNumber].answers[0]);
        break;
      case '2':
        handleAnswer(questions[questionNumber].answers[1]);
        break;
      case '3':
        handleAnswer(questions[questionNumber].answers[2]);
        break;
      case '4':
        handleAnswer(questions[questionNumber].answers[3]);
        break;
      case '5':
        handleAnswer(questions[questionNumber].answers[4]);
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    setQuestionStart(true);
    document.addEventListener('keypress', (e) => { handleAnswerKeypress(e.key); });
    return () => {
      dispatch({ type: wordsTypes.RESET_WORDS });
      document.removeEventListener('keypress', (e) => { handleAnswerKeypress(e.key); });
      clearTimeout(showAnswersTimeout);
      clearTimeout(roundTimeout);
    };
  }, []);

  useEffect(() => {
    if (questions.length > 0) {
      roundTimeout = setTimeout(() => handleNoAnswer(), ROUND_TIME);
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
      <button style={{ textAlign: 'left' }} type="button" onClick={() => setQuestionStart(!questionStart)}>Button</button>
        <RoundNumber questionNumber={questionNumber} COUNT_QUESTIONS={COUNT_QUESTIONS} />
        <Question
          rightOrWrong={rightOrWrong}
          question={questions[questionNumber].word}
          start={questionStart}
        />
        <div className="answers__container">
          {questions[questionNumber]
          .answers.map((answer, index) => <AnswerBtns text={`${index + 1}. ${answer}`} key={answer} isDisabled={isDisabled} handleAnswer={handleAnswer} />)}
        </div>
      </div>
    </div>
  );
}
