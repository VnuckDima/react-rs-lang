import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import EndGame from '../../../components/EndGame/EndGame';
import useUserActions from '../../../hooks/userAction';
import RoundNumber from '../../../components/RoundNumber/RoundNumber';
import Score from '../../../components/Score/Score';
import { useTypedSelector } from '../../../hooks/useTypeSelector';
import { wordsTypes } from '../../../store/reducers/words';
import { IUserAddWords, TAnswers, wordExtended } from '../../../types/types';
import {
  soundBroken, soundCorrect, soundsPath,
} from '../../../utils/const';
import { playAudio, updateBody } from '../../../utils/utils';
import AnswerBtns from '../AnswerBtns/AnswerBtns';
import Question from '../Question/Question';

type TSavannahGame = {
  questions: wordExtended[]
}

const ROUND_TIME = 5000;
const SHOW_ANSWERS_TIME = 2000;
let roundTimeout: ReturnType<typeof setTimeout> = setTimeout(() => { });
let showAnswersTimeout: ReturnType<typeof setTimeout> = setTimeout(() => { });
let scoreMultiplier = 1;

export default function SavannahGame({ questions }: TSavannahGame) {
  const { user, allWords } = useTypedSelector((state) => state.user);
  const { words } = useTypedSelector((state) => state.words);
  const { addUserWord, updateWord } = useUserActions();
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

  function changeStatistic(userId: string, wordId: string, corrected: boolean) {
    if (wordId in allWords) {
      const newBody = updateBody(corrected, allWords[wordId].userWord.optional!);
      /* if (newBody.correctOnTheRow === 4) {
        updateWord(userId, wordId, 'learned', newBody);
        dispatch({})если 4 подрят правильных ответа то добавить в learned
      }
      */
      const { difficulty } = allWords[wordId].userWord;
      updateWord(userId, wordId, difficulty, newBody);
    } else {
      addUserWord(wordId, userId, 'newWord', corrected);
    }
  }

  const handleAnswer = (text: string, wordId: string):void => {
    clearTimeout(roundTimeout);
    if (text.includes(questions[questionNumber].wordTranslate)) {
        handleRightAnswer();
        changeStatistic(user.userId, wordId, true);
      } else {
        handleWrongAnswer();
        changeStatistic(user.userId, wordId, false);
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
      roundTimeout = setTimeout(() => handleNoAnswer(), ROUND_TIME);
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
