import { element, by, ElementFinder } from 'protractor';
import { menuPage } from '../menu.po';

export const complaintListPage = {
  navigeTo: () => {
    return menuPage.getComplaintsMenuItem().click();
  },

  getComplaints: () => {
    return element.all(by.tagName('mat-card'));
  },

  getAddComplaintButton: () => {
    return element.all(by.id('add'));
  },

  getComplaintSubject: (text: string) => {
    return element(by.cssContainingText('mat-card-title', text));
  },

  getComplaintEditButton: (e: ElementFinder) => {
    return e.element(by.buttonText('EDIT'));
  }
};
