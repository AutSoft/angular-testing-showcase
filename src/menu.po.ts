import { element, by } from 'protractor';

export const menuPage = {
  getFlightsMenuItem: () => {
    return element(by.id('flights-menu'));
  },

  getComplaintsMenuItem: () => {
    return element(by.id('complaints-menu'));
  }
};
