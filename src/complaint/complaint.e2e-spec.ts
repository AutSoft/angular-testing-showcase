import { complaintEditPage } from './complaint-edit.po';
import { logIn } from '../utils';
import { complaintListPage } from './ complaint-list.po';

describe('Complaint', () => {
  beforeEach(async () => {
    await logIn();
  });

  it('should save complaint', async () => {
    await complaintEditPage.navigateTo();

    const subject = 'Test' + Math.random();
    await complaintEditPage.getNameInput().sendKeys('Reuben Saunders');
    await complaintEditPage.getEmailInput().sendKeys('reuben.saunders@email.com');
    await complaintEditPage.getPhoneNumberInput().sendKeys('+1-202-555-0152');
    await complaintEditPage.getSubjectInput().sendKeys(subject);
    await complaintEditPage.getContentInput().sendKeys(
      'I had to wait 3 hours in the plane for take-off, I will surely never coming back to this airport again');
    await complaintEditPage.getImageUrlInput().sendKeys('https://source.unsplash.com/random/1500x700');
    await complaintEditPage.getSubmitButton().click();

    await complaintListPage.navigeTo();
    const element = await complaintListPage.getComplaintSubject(subject);
    expect(await element.isPresent()).toBe(true);
  });

  it('should edit complaint', async () => {
    await complaintListPage.navigeTo();
    const element = await complaintListPage.getComplaints().first();
    await complaintListPage.getComplaintEditButton(element).click();

    const changedSubject = 'E2e test' + Math.random();
    await complaintEditPage.getSubjectInput().clear();
    await complaintEditPage.getSubjectInput().sendKeys(changedSubject);
    await complaintEditPage.getSubmitButton().click();

    const changedElement = complaintListPage.getComplaintSubject(changedSubject);
    expect(await changedElement.isPresent()).toBe(true);
  });
});
