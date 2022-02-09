export const enum userType {
  ADD_HARD_WORD = 'ADD_HARD_WORD',
  ADD_LEARNED_WORD = 'ADD_LEARNED_WORD',
  UPLOAD_USER_WORDS = 'UPLOAD_USER_WORDS',
  UPDATE_USER = 'UPDATE_USER',
  RESET_USER_DATA = 'RESET_USER_DATA',
  DELETE_USER_WORD = 'DELETE_USER_WORD',
  START_LOADING = 'START_LOADING',
  END_LOADING = 'END_LOADING',
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

export interface IUserAddWords {
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
  isLoaded: boolean,
}

interface IUserWord {
  id: string,
  difficulty: string,
  wordId: string
}

interface IActionAddWord {
  type: userType.ADD_HARD_WORD | userType.ADD_LEARNED_WORD,
  payload: IUserWord,
}

interface IActionDeleteWord {
  type: userType.DELETE_USER_WORD,
  payload: {
    wordId: string,
    difficulty: string
  },
}

interface IActionUpdateUser {
  type: userType.UPDATE_USER,
  payload: ILoginData,
}

interface IActionUploadUserWords {
  type: userType.UPLOAD_USER_WORDS,
  payload: {
    hardWords: IUserAddWords,
    learnedWords: IUserAddWords,
  },
}

interface IActionResetUser {
  type: userType.RESET_USER_DATA | userType.START_LOADING | userType.END_LOADING,
}

export type IUserAction = IActionAddWord |
  IActionUpdateUser |
  IActionDeleteWord |
  IActionResetUser |
  IActionUploadUserWords

export interface IWordsAction {
  type: string
  payload: word[]
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

export type TAnswers = {
  word: string
  audio: string
  translateWord: string
}
