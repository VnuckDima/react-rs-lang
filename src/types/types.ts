export const enum userType {
  ADD_HARD_WORD = 'ADD_HARD_WORD',
  ADD_LEARNED_WORD = 'ADD_LEARNED_WORD',
  UPDATE_WORD = 'UPDATE_WORD',
  UPLOAD_USER_WORDS = 'UPLOAD_USER_WORDS',
  UPLOAD_ALL_WORDS = 'UPLOAD_ALL_WORDS',
  ADD_ALL_WORD = 'ADD_ALL_WORD',
  UPDATE_USER = 'UPDATE_USER',
  RESET_USER_DATA = 'RESET_USER_DATA',
  DELETE_USER_WORD = 'DELETE_USER_WORD',
  START_LOADING = 'START_LOADING',
  UPDATE_STATISTIC = 'UPDATE_STATISTIC',
  UPLOAD_USER_STATISTIC = 'UPLOAD_USER_STATISTIC',
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

export type wordExtended = {
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
  answers: string[],
}

export type TBody = {
  correct?: number,
  incorrect?: number,
  correctOnTheRow?: number,
}

export interface IUserDataInLS {
  message: string,
  userId: string,
  name: string,
}

export interface IUserTokensInLS {
  token: string,
  refreshToken: string,
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
    wordId: string,
    userWord: {
      difficulty: string,
      optional?: TBody
    }
  }
}

export interface IStatisticGames {
  corrected: number
  incorrected: number
}

export interface IStatisticOneDay extends IStatisticGames {
  correctOnTheRow: number
}

export interface IStatistic {
  learnedWords: number,
  optional: {
    allTimeStat: { games: IStatisticGames[] }
    oneDayStats: {
      newWords: number
      learned: number
      games: IStatisticOneDay[]
    }
  }
}

export interface IUserData {
  hardWords: IUserAddWords,
  learnedWords: IUserAddWords,
  newWords: IUserAddWords,
  allWords: IUserAddWords,
  statistics: IStatistic,
  user: ILoginData,
  isLoadedUserData: boolean,
}

interface IUserWord {
  id: string,
  wordId: string
  userWord: {
    difficulty: string,
    optional?: TBody
  }
}

type TAllWords = {
  type: userType.UPLOAD_ALL_WORDS
  payload: IUserAddWords
}

interface IActionAddWord {
  type: userType.ADD_HARD_WORD |
  userType.ADD_LEARNED_WORD |
  userType.ADD_ALL_WORD,
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

type TUpdateWord = {
  type: userType.UPDATE_WORD
  payload: IUserWord
}

type TUpdateStaticstic = {
  type: userType.UPDATE_STATISTIC | userType.UPLOAD_USER_STATISTIC
  payload: IStatistic
}

export type IUserAction = IActionAddWord |
  IActionUpdateUser |
  IActionDeleteWord |
  IActionResetUser |
  IActionUploadUserWords |
  TAllWords |
  TUpdateWord |
  TUpdateStaticstic

export interface IWordsAction {
  type: string
  payload: word[]
}

export interface IWordReducer {
  words: word[];
  isLoadedWords: boolean;
}

export interface IAggregatedWord extends word {
  userWord: {
    difficulty: string
    optional: TBody
  }
  _id: string
}

export type TAnswers = {
  word: string
  audio: string
  translateWord: string
}

export type TAllWordsArray = {
  difficulty: string
  id: string
  wordId: string
  optional: TBody
}
