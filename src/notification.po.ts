import { element, by } from 'protractor';

export const notificationPage = {
  getNotification: () => {
    return element(by.tagName('simple-snack-bar'));
  }
};
