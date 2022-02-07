export const enum userType {
  ADD_HARD_WORD = 'ADD_HARD_WORD',
  ADD_LEARNED_WORD = 'ADD_LEARNED_WORD',
  UPDATE_USER_NAME = 'UPDATE_USER_NAME',
  RESET_USER_DATA = 'RESET_USER_DATA',
  DELETE_USER_WORD = 'DELETE_USER_WORD',
}

export type word = {
  id: string,
  group: number,
  page: number,
  word: string,
  image: string,
  audio: string,
  audioMeaning: string,
  audioExample: string,
  textMeaning: string,
  textExample: string,
  transcription: string,
  wordTranslate: string,
  textMeaningTranslate: string,
  textExampleTranslate: string,
}

export interface ILoginData {
  message: string,
  token: string,
  refreshToken: string,
  userId: string,
  name: string,
}

interface IUserAddWords {
  [id: string]: {
    id: string,
    difficulty: string,
    wordId: string
  }
}

export interface IUserData {
  hardWords: IUserAddWords,
  learnedWords: IUserAddWords,
  user: ILoginData,
}

interface IActionAddWord {
  type: userType.ADD_HARD_WORD | userType.ADD_LEARNED_WORD,
  payload: {
    id: string,
    difficulty: string,
    wordId: string
  },
}

interface IActionDeleteWord {
  type: userType.DELETE_USER_WORD,
  payload: {
    wordId: string,
    difficulty: string
  },
}

interface IActionUpdateUser {
  type: userType.UPDATE_USER_NAME,
  payload: ILoginData,
}

interface IActionResetUser {
  type: userType.RESET_USER_DATA,
}

export type IUserAction = IActionAddWord | IActionUpdateUser | IActionDeleteWord | IActionResetUser

export interface IWordsAction {
  type: string
  payload: word[]
}


export type audioCallAnswer = {
  wordTranslate: string,
  id: string,
}


export interface IWordReducer {
  words: word[];
  isLoaded: boolean;
}


export interface IAggregatedWord extends word {
  userWord: {
    difficulty: string
  }
  _id: string
}

