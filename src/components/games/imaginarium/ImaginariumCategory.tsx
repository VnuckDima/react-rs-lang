import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import useWordsActions from '../../../hooks/useWordsAction';
import { useTypedSelector } from '../../../hooks/useTypeSelector';
import { TAnswers, word } from '../../../types/types';
import CategorySelect from './CategorySelect/CategorySelect';
import { playAudio, randomNum, shuffle } from '../../../utils/utils';
import EndAudioGame from './EndGame/EndGame';
import { HEAD_URL } from '../../../utils/API';
import QuestionBtns from './QuestionBtns/QuestionBtns';

// Вспомогательная функция для makeArrayQuestions
// Создает и возвращает массив из 5 переводов слова, первым идет переданное в функцию.
// Слова выбираются из массива words от 0 до 19
function makeQuestion(words: word[], firstWord:string): string[] {
  const set = new Set<string>();
  set.add(firstWord);
  for (let i = 0; ; i += 1) {
    set.add(words[randomNum(0, 19)].image);
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
  const arrayQuestions:[string[]] = [shuffle([...makeQuestion(words, words[0].image)])];
  for (let i = 1; i < 20; i += 1) {
    const oneQuestion = shuffle([...makeQuestion(words, words[i].image)]);
    arrayQuestions.push(oneQuestion);
  }
  return arrayQuestions;
}

// TODO прокинуть пропсом isGame, selectedCategory
function ImaginariumCategory() {
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
      setTimeout(() => playAudio(words[0].audio, HEAD_URL), 1000);
    }
    return () => {
      dispatch({ type: 'IS_LOADING' });
    };
  }, [isLoaded]);

  // при смене номера вопроса воспроизведение следующего слова
  // TODO в if добавить второе условие, чтобы в конце игры не воспроизводилось лишнее слово
  useEffect(() => {
    if (questionNumber > 0 && isGame) {
      setTimeout(() => playAudio(words[questionNumber].audio, HEAD_URL), 500);
    }
  }, [questionNumber]);

  // начало отрисовки, собственно компоненты АудиоВызов
  // если номер вопроса равен 6, то рисуется компонента EndAudioGame
  if (questionNumber === 6 && isGame) {
    return (
      <EndAudioGame
      setIsGame={setIsGame}
      answers={{ correctAnswers, incorrectAnswers }}
      setQuestionNumber={setQuestionNumber}
      />
    );
  }

  if (!isGame) {
    return <CategorySelect setIsGame={setIsGame} setSelectedCategory={setSelectedCategory} />;
  }

  // иначе рисуется сама игра и AudioBtn
  return (
    <div className="audiocall">
      <div className="audiocall__container">
        <svg
          onClick={() => playAudio(words[questionNumber].audio, HEAD_URL)}
          className="bi bi-volume-up-fill audiocall__svg"
          viewBox="0 0 16 16"
        >
          <path d="M11.536 14.01A8.473 8.473 0 0 0 14.026 8a8.473 8.473 0 0 0-2.49-6.01l-.708.707A7.476 7.476 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303l.708.707z" />
          <path d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.483 5.483 0 0 1 11.025 8a5.483 5.483 0 0 1-1.61 3.89l.706.706z" />
          <path d="M8.707 11.182A4.486 4.486 0 0 0 10.025 8a4.486 4.486 0 0 0-1.318-3.182L8 5.525A3.489 3.489 0 0 1 9.025 8 3.49 3.49 0 0 1 8 10.475l.707.707zM6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06z" />
        </svg>
        <div className="answers__container">
          {words.length > 0 && (
          <QuestionBtns
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

export default ImaginariumCategory;
