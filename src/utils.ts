import { browser } from 'protractor';
import { loginPage } from './login.po';

export const userCredentials = {
  username: 'test', password: 'test'
};

export async function logIn() {
  await loginPage.navigateTo();
  await loginPage.getUsernameInput().sendKeys(userCredentials.username);
  await loginPage.getPasswordInput().sendKeys(userCredentials.password);
  await loginPage.getSubmitButton().click();
  await browser.waitForAngular();
}
