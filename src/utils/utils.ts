import React from 'react';
import {
  IAggregatedWord,
  ILoginData,
  IUserAddWords,
  IUserDataInLS,
  IUserTokensInLS,
  word,
  wordExtended,
} from '../types/types';

export enum games {
  AUDIO_CALL = 'AUDIO_CALL',
  SPRINT = 'SPRINT',
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
      id,
      difficulty: word.userWord.difficulty,
      wordId: word._id,
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
    set.add(words[randomNum(0, 19)].wordTranslate);
    if (set.size === 5) return [...set];
  }
}

export function makeArrayQuestions(words: word[]) {
  const arrayQuestions: [string[]] = [shuffle([...makeQuestion(words, words[0].wordTranslate)])];
  for (let i = 1; i < 20; i += 1) {
    const oneQuestion = shuffle([...makeQuestion(words, words[i].wordTranslate)]);
    arrayQuestions.push(oneQuestion);
  }
  return arrayQuestions;
}

export function makeBVFROMRUArrayQuestions(words: word[]): wordExtended[] {
  const questionsArr: wordExtended[] = [];
  for (let i = 0; i < 20; i += 1) {
    // Не придумал как сделать код ниже изящнее чтобы побороть Typescript
    const answers = shuffle([...makeQuestion(words, words[i].wordTranslate)]);
    const questionObj = Object.assign(words[i]);
    questionObj.answers = answers;
    questionsArr[i] = questionObj;
  }
  console.log('questions');
  console.log(questionsArr);
  console.log('words');
  console.log(words);
  return shuffle(questionsArr);
}
