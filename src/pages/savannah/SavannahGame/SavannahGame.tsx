import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import EndGame from '../../../components/EndGame/EndGame';
import { useTypedSelector } from '../../../hooks/useTypeSelector';
import useWordsActions from '../../../hooks/useWordsAction';
import { wordsTypes } from '../../../store/reducers/words';
import { TAnswers } from '../../../types/types';
import { makeArrayQuestions, randomNum } from '../../../utils/utils';
import AnswerBtns from '../AnswerBtns/AnswerBtns';
import Question from '../Question/Question';
import RoundNumber from '../RoundNumber/RoundNumber';

type TSavannahGame = {
  category: number;
  page: number;
}

export default function SavannahGame({ category, page }: TSavannahGame) {
    const NUMBEROFQUESTIONS = 5;
    const { words, isLoaded } = useTypedSelector((state) => state.words);
    const dispatch = useDispatch();
    const { loadWords } = useWordsActions();
    const [questions, setQuestions] = useState<[string[]]>([[]]);
    const [questionNumber, setQuestionNumber] = useState(0);
    const [correctAnswers, setCorrectAnswers] = useState<TAnswers[]>([]);
    const [incorrectAnswers, setIncorrectAnswers] = useState<TAnswers[]>([]);

    useEffect(() => {
      loadWords(page, category);
      return () => {
        dispatch({ type: wordsTypes.RESET_WORDS });
      };
    }, []);

    useEffect(() => {
      if (isLoaded) {
        setQuestions(makeArrayQuestions(words));
      }
      console.log('Сколько раз загружается.');
    }, [isLoaded]);

    useEffect(() => {
      if (questionNumber > 0 && questionNumber < (NUMBEROFQUESTIONS)) {
        // setTimeout(() => playAudio(words[questionNumber].audio, HEAD_URL), 500);
      }
    }, [questionNumber]);

    if (questionNumber === (NUMBEROFQUESTIONS)) {
      return (
        <EndGame
        answers={{ correctAnswers, incorrectAnswers }}
        />
      );
    }

    if (!isLoaded) {
      return (
      <div id="preloader">
        <div id="loader" />
      </div>
      );
    }
    return (
    <div className="audiocall">
      <div className="audiocall__container">
        <RoundNumber questionNumber={questionNumber} numberOfQuestions={NUMBEROFQUESTIONS} />
        {/* <h1>{words[questionNumber].audio}</h1> */}
        <Question question={words[questionNumber].word} />
        <div className="answers__container">
          {words.length > 0 && (
          <AnswerBtns
            addAnswer={{
              setCorrectAnswers,
              setIncorrectAnswers,
            }}
            correctAnswer={{
              word: words[questionNumber].word,
              audio: words[questionNumber].audio,
              translateWord: words[questionNumber].wordTranslate,
            }}
            text={questions[questionNumber]}
            setQuestionNumber={setQuestionNumber}
          />
          )}
        </div>
      </div>
    </div>
  );
}
