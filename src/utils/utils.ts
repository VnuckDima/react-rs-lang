import React from 'react';
import {
  IAggregatedWord,
  ILoginData,
  IStatisticOneDay,
  IUserAddWords,
  IUserDataInLS,
  IUserTokensInLS,
  TAllWordsArray,
  TBody,
  word,
  wordExtended,
} from '../types/types';

export enum games {
  AUDIO_CALL = 'AUDIO_CALL',
  SPRINT = 'SPRINT',
  SAVANNAH = 'SAVANNAH',
  NONE = 'NONE',
}

export function validateLogin(email: string, password: string): boolean {
  const validateEmail = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
  const validatePass = /(?=.*[0-9])(?=.*[a-z])[0-9a-zA-Z!@#$%^&*]{8,}/;
  if (validatePass.test(password) && validateEmail.test(email)) {
    return true;
  }
  return false;
}

export function saveUserDataInLS(data: IUserDataInLS) {
  localStorage.setItem('userData', JSON.stringify(data));
}

export function saveUserTokenInLS(data: IUserTokensInLS) {
  localStorage.setItem('userTokens', JSON.stringify(data));
}

export function validateRegistration(email: string, password: string, name: string): boolean {
  if (validateLogin(email, password) && name.length > 3) {
    return true;
  }
  return false;
}

export function makeObjectFromArray(array: IAggregatedWord[], userId: string): IUserAddWords {
  const object: IUserAddWords = {};
  array.forEach((word: IAggregatedWord) => {
    const id = userId;
    object[word._id] = {
      id: userId,
      wordId: word._id,
      userWord: {
        difficulty: word.userWord.difficulty,
        optional: word.userWord.optional,
      },
    };
  });
  return object;
}

export function makeObjectFromAllWordsArray(
  array: TAllWordsArray[],
  userId: string,
): IUserAddWords {
  const object: IUserAddWords = {};
  array.forEach((word: TAllWordsArray) => {
    object[word.wordId] = {
      id: userId,
      wordId: word.wordId,
      userWord: {
        difficulty: word.difficulty,
        optional: word.optional,
      },
    };
  });
  return object;
}

export function getSecondClass(difficulty: string): string {
  if (difficulty === 'сложных') return 'hard';
  if (difficulty === 'изученных') return 'learned';
  return '';
}

export function randomNum(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function shuffle<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export function playAudio(sound: string, url: string) {
  const soundUrl = `${url}/${sound}`;
  const audio = new Audio(soundUrl);
  audio.volume = 0.5;
  audio.play();
}

function makeQuestion(words: word[], firstWord: string): string[] {
  const set = new Set<string>();
  set.add(firstWord);
  for (let i = 0; ; i += 1) {
    set.add(words[randomNum(0, words.length - 1)].wordTranslate);
    if (set.size === 5) return [...set];
  }
}

export function makeBVFROMRUArrayQuestions(words: word[]): wordExtended[] {
  const questionsArr: wordExtended[] = [];
  for (let i = 0; i < words.length; i += 1) {
    // Не придумал как сделать код ниже изящнее чтобы побороть Typescript
    const answers = shuffle([...makeQuestion(words, words[i].wordTranslate)]);
    const questionObj = Object.assign(words[i]);
    questionObj.answers = answers;
    questionsArr[i] = questionObj;
  }
  return shuffle(questionsArr);
}

export function getInitialBody(corrected: boolean): TBody {
  if (corrected) {
    return {
      correct: 1,
      incorrect: 0,
      correctOnTheRow: 1,
    };
  }
  return {
    correct: 0,
    incorrect: 1,
    correctOnTheRow: 0,
  };
}

export function updateBody(corrected: boolean, oldBody: TBody): TBody {
  const newBody = { ...oldBody };
  if (oldBody) {
    if (corrected) {
      newBody.correct! += 1;
      newBody.correctOnTheRow! += 1;
      return newBody;
    }
    newBody.incorrect! += 1;
    newBody.correctOnTheRow = 0;
    return newBody;
  }
  return getInitialBody(corrected);
}

export function checkDate(date: string | null): boolean {
  if (typeof date !== 'string') {
    localStorage.setItem('date', new Date().toString());
    return false;
  }
  const oldDate = new Date(date);
  const currentDate = new Date();
  if (
    oldDate.getDate() === currentDate.getDate()
    && oldDate.getMonth() === currentDate.getMonth()
  ) {
    return true;
  }
  localStorage.setItem('date', new Date().toString());
  return false;
}

export function setWindowTitle() {
  const { pathname } = window.location;
  let pageTitle = 'Главная';
  const pagePrefix = 'RS Lang - ';
  switch (pathname) {
    case '/textbook':
      pageTitle = 'Учебник';
      break;
    case '/audio-call':
      pageTitle = 'Аудиовызов';
      break;
    case '/sprint':
      pageTitle = 'Спринт';
      break;
    case '/savannah':
      pageTitle = 'Саванна';
      break;
    case '/statistics':
      pageTitle = 'Статистика';
      break;
    case '/login':
      pageTitle = 'Логин';
      break;
    default:
      break;
  }
  document.title = pagePrefix + pageTitle;
  return pageTitle;
}

export function checkAuthTimer(date: string) {
  const oldDate = new Date(date);
  const currentDate = new Date();
  oldDate.setHours(oldDate.getHours() + 4);
  if (new Date().getTime() - new Date(oldDate).getTime() < 0) {
    return true;
  }
  return false;
}

export function percentCorrectAnswers(games: IStatisticOneDay[]) {
  let correct = 0;
  let incorrect = 0;
  games.forEach((game) => {
    correct += game.corrected;
    incorrect += game.incorrected;
  });
  return Math.round(((correct * 100) / (correct + incorrect)));
}

export function saveLSBeforeUnload(page: number, category: number) {
  localStorage.setItem('lastTextbookPage', JSON.stringify({ page, category }));
}
