import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import useWordsActions from '../../../hooks/useWordsAction';
import { useTypedSelector } from '../../../hooks/useTypeSelector';
import { TAnswers, word } from '../../../types/types';
import CategorySelect from './CategorySelect/CategorySelect';
import { playAudio, randomNum, shuffle } from '../../../utils/utils';
import EndGame from './EndGame/EndGame';
import { HEAD_URL } from '../../../utils/API';
import AnswerBtns from './AnswerBtns/AnswerBtns';
import Question from './Question/Question';
import RoundNumber from './RoundNumber/RoundNumber';

const NUMBEROFQUESTIONS = 5;

// Вспомогательная функция для makeArrayQuestions
// Создает и возвращает массив из 5 переводов слова, первым идет переданное в функцию.
// Слова выбираются из массива words от 0 до 19
function makeQuestion(words: word[], firstWord:string): string[] {
  const set = new Set<string>();
  set.add(firstWord);
  for (let i = 0; ; i += 1) {
    set.add(words[randomNum(0, 19)].wordTranslate);
    if (set.size === 5) {
      // console.log([...set]);
      return [...set];
    }
  }
}

// Создает и возвращает полный массив слов на всю игру.
// В нем 20 элементов, в каждом элементе массив из 5 перемешанных
// переводов - 1 правильный и 4 неправильных.
// Исходные данные - массив words.
function makeArrayQuestions(words: word[]) {
  const arrayQuestions:[string[]] = [shuffle([...makeQuestion(words, words[0].wordTranslate)])];
  for (let i = 1; i < 20; i += 1) {
    const oneQuestion = shuffle([...makeQuestion(words, words[i].wordTranslate)]);
    arrayQuestions.push(oneQuestion);
  }
  return arrayQuestions;
}

// TODO прокинуть пропсом isGame, selectedCategory
function SavannahCategory() {
  // загружен ли массив words?
  const { words, isLoaded } = useTypedSelector((state) => state.words);
  // хз что
  const dispatch = useDispatch();
  // хз что
  const { loadWords } = useWordsActions();
  // isGame: bool - идет игра, или выбор категории
  const [isGame, setIsGame] = useState(false);
  // выбор категории
  const [selectedCategory, setSelectedCategory] = useState(0);
  // создание полного массива слов на игру
  const [questions, setQuestions] = useState<[string[]]>([[]]);
  // номер вопроса
  const [questionNumber, setQuestionNumber] = useState(0);
  // правильные ответы
  const [correctAnswers, setCorrectAnswers] = useState<TAnswers[]>([]);
  // неправильные ответы
  const [incorrectAnswers, setIncorrectAnswers] = useState<TAnswers[]>([]);

  // при выборе категории или активном состоянии игры загрузка слов из выбранной категории
  // и обнуление массивов правильных и неправильных ответов
  useEffect(() => {
    if (isGame) {
      loadWords(randomNum(0, 19), selectedCategory);
      setCorrectAnswers([]);
      setIncorrectAnswers([]);
    }
  }, [selectedCategory, isGame]);

  // после загрузки слов создание массива на всю игру и воспроизведение первого слова
  // если слова не загружены, диспатч "IS_LOADING"
  useEffect(() => {
    if (isLoaded) {
      setQuestions(makeArrayQuestions(words));
    }
    return () => {
      dispatch({ type: 'IS_LOADING' });
    };
  }, [isLoaded]);

  // при смене номера вопроса воспроизведение следующего слова
  // TODO в if добавить второе условие, чтобы в конце игры не воспроизводилось лишнее слово
  useEffect(() => {
    if (questionNumber > 0 && questionNumber < (NUMBEROFQUESTIONS) && isGame) {
      // setTimeout(() => playAudio(words[questionNumber].audio, HEAD_URL), 500);
    }
  }, [questionNumber]);

  // начало отрисовки, собственно компоненты АудиоВызов
  // если номер вопроса равен (NUMBEROFQUESTIONS), то рисуется компонента EndAudioGame
  if (questionNumber === (NUMBEROFQUESTIONS) && isGame) {
    return (
      <EndGame
      setIsGame={setIsGame}
      answers={{ correctAnswers, incorrectAnswers }}
      setQuestionNumber={setQuestionNumber}
      />
    );
  }

  // Если игра не началась, то рисуется выбор категорий
  if (!isGame) {
    return <CategorySelect setIsGame={setIsGame} setSelectedCategory={setSelectedCategory} />;
  }

  // иначе рисуется сама игра и AudioBtn
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

export default SavannahCategory;
