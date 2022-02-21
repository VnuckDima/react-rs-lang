import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import EndGame from '../../../components/EndGame/EndGame';
import Score from '../../../components/Score/Score';
import Timer from '../../../components/Timer/Timer';
import { useTypedSelector } from '../../../hooks/useTypeSelector';
import { wordsTypes } from '../../../store/reducers/words';
import {
  TAnswers,
  TBody,
  userType,
  wordExtended,
} from '../../../types/types';
import { soundCorrect, soundIncorrect, soundsPath } from '../../../utils/const';
import { playAudio, updateBody } from '../../../utils/utils';
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
      setScore(score + Number((30 * scoreMultiplier).toFixed(2)));
      scoreMultiplier += 0.1;
    } else if (scoreMultiplier > 0.2) {
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

  function changeDifficulty(
    userId: string,
    wordId: string,
    corrected: boolean,
    newBody: TBody,
    difficulty: string,
    ) {
    const data = {
      id: userId,
      wordId,
      userWord: {
        difficulty: 'learned',
        optional: newBody,
      },
    };
    if (difficulty === 'hard') {
      if (corrected) {
        if (newBody.correctOnTheRow! === 5) {
          updateWord(userId, wordId, 'learned', corrected, newBody);
          dispatch({ type: userType.DELETE_USER_WORD, payload: { wordId, difficulty: 'hard' } });
          dispatch({ type: userType.ADD_LEARNED_WORD, payload: data });
        } else {
          updateWord(userId, wordId, difficulty, corrected, newBody);
        }
      } else {
        updateWord(userId, wordId, difficulty, corrected, newBody);
      }
    } else if (difficulty === 'learned') {
      updateWord(userId, wordId, difficulty, corrected, newBody);
    } else if (difficulty === 'newWord') {
      if (newBody.correctOnTheRow! === 3) {
        updateWord(userId, wordId, 'learned', corrected, newBody);
        dispatch({ type: userType.ADD_LEARNED_WORD, payload: data });
      } else {
        updateWord(userId, wordId, difficulty, corrected, newBody);
      }
    }
  }

  function changeStatistic(userId: string, wordId: string, corrected: boolean) {
    if (user.message !== 'Authenticated') return;
    if (wordId in allWords) {
      const newBody = updateBody(corrected, allWords[wordId].userWord.optional!);
      const { difficulty } = allWords[wordId].userWord;
      changeDifficulty(userId, wordId, corrected, newBody, difficulty);
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
    if (questionNumber !== questions.length && timer >= 0) {
      generateRandomTranslation();
      setEquality('=');
    }
  }, [questionNumber]);

  if (questionNumber === questions.length || timer <= 0) {
    return (
      <EndGame
      gameName="Sprint"
      correctOnTheRow={correctOnTheRow}
      newWords={newWords}
      answers={{ correctAnswers, incorrectAnswers }}
      score={score}
      />
    );
  }
    return (
      <div className="main__container sprint">
        <div className="wrapper">
          <div className="audiocall__container minigame__container">
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
            <p className="minigame__hint">
              Используйте клавиши вправо и влево для управления с клавитауры.
            </p>
          </div>
        </div>
      </div>
  );
}
