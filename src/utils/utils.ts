import { ILoginData } from '../types/types';

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
