import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import EndGame from '../../../components/EndGame/EndGame';
import RoundNumber from '../../../components/RoundNumber/RoundNumber';
import Score from '../../../components/Score/Score';
import Timer from '../../../components/Timer/Timer';
import { useTypedSelector } from '../../../hooks/useTypeSelector';
import { wordsTypes } from '../../../store/reducers/words';
import { TAnswers, wordExtended } from '../../../types/types';
import {
  soundBroken, soundCorrect, soundIncorrect, soundsPath,
} from '../../../utils/const';
import { playAudio, randomNum, updateBody } from '../../../utils/utils';
import Question from '../Question/Question';
import RightOrWrongBtns from '../../../components/RightOrWrongBtns/RightOrWrongBtns';
import useUserActions from '../../../hooks/userAction';

type TSprintGame = {
  questions: wordExtended[]
}

const SHOW_ANSWERS_TIME = 2000;
const GAME_TIME = 60;
let showAnswersTimeout: ReturnType<typeof setTimeout> = setTimeout(() => { });
let gameTimer: ReturnType<typeof setTimeout> = setTimeout(() => { });
let scoreMultiplier = 1;
let randomTranslation = '';

export default function SprintGame({ questions }: TSprintGame) {
  const { user, allWords } = useTypedSelector((state) => state.user);
  const { addUserWord, updateWord } = useUserActions();
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
  const [newWords, setNewWords] = useState(0);
  const [correctOnTheRow, setCorrectOnTheRow] = useState(0);
  const currentCorrectOnTheRow = useRef<number>(0);

  function handleTimer() {
    setTimer((state) => state - 1);
    if (timer > 0) {
      gameTimer = setTimeout(() => handleTimer(), 1000);
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
      setEquality('≠');
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
    playAudio(soundIncorrect, soundsPath);
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

  function changeStatistic(userId: string, wordId: string, corrected: boolean) {
    if (wordId in allWords) {
      const newBody = updateBody(corrected, allWords[wordId].userWord.optional!);
      const { difficulty } = allWords[wordId].userWord;
      updateWord(userId, wordId, difficulty, newBody);
    } else {
      addUserWord(wordId, userId, 'newWord', corrected);
    }
  }

  const handleAnswer = (text: string, wordId: string):void => {
    if ((randomTranslation === questions[questionNumber].wordTranslate && text === 'Верно') || (randomTranslation !== questions[questionNumber].wordTranslate && text !== 'Верно')) {
      handleRightAnswer();
      currentCorrectOnTheRow.current += 1;
      changeStatistic(user.userId, wordId, true);
    } else {
      handleWrongAnswer();
      currentCorrectOnTheRow.current = 0;
      changeStatistic(user.userId, wordId, false);
    }
    if (correctOnTheRow < currentCorrectOnTheRow.current) {
      setCorrectOnTheRow(currentCorrectOnTheRow.current);
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
      clearTimeout(gameTimer);
    };
  }, []);

  useEffect(() => {
    generateRandomTranslation();
    setEquality('=');
  }, [questionNumber]);

  if (questionNumber === questions.length || timer <= 0) {
    return (
      <EndGame
      correctOnTheRow={correctOnTheRow}
      newWords={newWords}
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
          <RightOrWrongBtns
          setNewWords={setNewWords}
          currentQuestion={questions[questionNumber]}
          isDisabled={isDisabled}
          handleAnswer={handleAnswer}
          />
        </div>
      </div>
    </div>
  );
}
