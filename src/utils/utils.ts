import React from 'react';
import {
  IAggregatedWord,
  ILoginData,
  IUserAddWords,
  word,
} from '../types/types';

export function validateLogin(email: string, password: string): boolean {
  const validateEmail = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
  const validatePass = /(?=.*[0-9])(?=.*[a-z])[0-9a-zA-Z!@#$%^&*]{8,}/;
  if (validatePass.test(password) && validateEmail.test(email)) {
    return true;
  }
  return false;
}

export function saveUserDataInLS(data: ILoginData) {
  localStorage.setItem('userData', JSON.stringify(data));
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

export function shuffle(array: string[]): string[] {
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
