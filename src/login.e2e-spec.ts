import { browser } from 'protractor';
import { userCredentials } from './utils';
import { loginPage } from './login.po';
import { notificationPage } from './notification.po';

describe('Login', () => {

  beforeEach(async () => {
    await loginPage.navigateTo();
    await browser.executeScript('localStorage.clear()');
  });

  it('should log in', async () => {
    await loginPage.getUsernameInput().sendKeys(userCredentials.username);
    await loginPage.getPasswordInput().sendKeys(userCredentials.password);
    await loginPage.getSubmitButton().click();
    expect(await browser.getCurrentUrl()).toContain('/flights');
  });

  it('should not log in if invalid user credentails are stored', async () => {
    await loginPage.getUsernameInput().sendKeys(userCredentials.username + 't');
    await loginPage.getPasswordInput().sendKeys(userCredentials.password);
    await loginPage.getSubmitButton().click();
    await browser.waitForAngular();
    expect(await notificationPage.getNotification().isDisplayed()).toBe(true);
  });
});
