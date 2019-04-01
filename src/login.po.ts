import { browser, element, by } from 'protractor';

export const loginPage = {
  navigateTo: () => {
    return browser.get('/login');
  },

  getUsernameInput: () => {
    return element(by.name('username'));
  },

  getPasswordInput: () => {
    return element(by.name('password'));
  },

  getSubmitButton: () => {
    return element(by.id('submit'));
  }
};
