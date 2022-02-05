export const enum userType {
  ADD_HARD_WORD = 'ADD_HARD_WORD',
  ADD_STUDIED_WORD = 'ADD_STUDIED_WORD',
  UPDATE_USER_NAME = 'UPDATE_USER_NAME',
  RESET_USER_DATA = 'RESET_USER_DATA',
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

export interface IUserData {
  hardWords: word[],
  studiedWords: word[],
  user: ILoginData,
}

interface IActionAddWord {
  type: userType.ADD_HARD_WORD | userType.ADD_STUDIED_WORD,
  payload: word,
}

interface IActionUpdateName {
  type: userType.UPDATE_USER_NAME,
  payload: ILoginData,
}

export type IUserAction = IActionAddWord | IActionUpdateName;

export interface IWordsAction {
  type: string
  payload: word[]
}
