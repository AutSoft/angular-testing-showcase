import { async, ComponentFixture, TestBed, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { ComplaintEditComponent } from './complaint-edit.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatFormFieldModule, MatInputModule, MatProgressSpinnerModule, MatSnackBar } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ComplaintService } from '../complaint.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of, Observable, Observer } from 'rxjs';
import { Router } from '@angular/router';
import { NewComplaint } from '../new-complaint';
import { Complaint } from '../complaint';

describe('ComplaintEditComponent', () => {
  let component: ComplaintEditComponent;
  let fixture: ComponentFixture<ComplaintEditComponent>;
  let complaintService;
  let snackBar;
  let nameInput: HTMLInputElement, emailInput: HTMLInputElement, phoneInput: HTMLInputElement, subjectInput: HTMLInputElement,
  contentInput: HTMLInputElement, imageUrlInput: HTMLInputElement;
  let submitButton: HTMLButtonElement;
  let newComplaint: NewComplaint;
  let complaint: Complaint;

  beforeEach(() => {
    newComplaint = {
      subject: 'Toilets are messy',
      content: 'The first floor toilets look dreadful',
      name: 'Archie Webb',
      email: 'archie.webb@email.com',
      phoneNumber: '+1-202-555-0115',
      imageSource: 'https://source.unsplash.com/random/800x600'
    };
    complaint = { id: 0, ...newComplaint };
    complaintService = jasmine.createSpyObj(
      'ComplaintService',
      [ 'getComplaint', 'saveComplaint', 'updateComplaint' ]
    );
    snackBar = jasmine.createSpyObj('MatSnackBar', [ 'open' ]);
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ ComplaintEditComponent ],
      imports: [ FlexLayoutModule, MatButtonModule, FormsModule, MatFormFieldModule, FormsModule, MatInputModule, MatProgressSpinnerModule, RouterTestingModule, NoopAnimationsModule ],
      providers: [
        { provide: ComplaintService, useValue: complaintService },
        { provide: MatSnackBar, useValue: snackBar },
        { provide: ComponentFixtureAutoDetect, useValue: true }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplaintEditComponent);
    component = fixture.componentInstance;

    nameInput = fixture.nativeElement.querySelector('[name="name"]');
    emailInput = fixture.nativeElement.querySelector('[name="email"]');
    phoneInput = fixture.nativeElement.querySelector('[name="phoneNumber"]');
    subjectInput = fixture.nativeElement.querySelector('[name="subject"]');
    contentInput = fixture.nativeElement.querySelector('[name="content"]');
    imageUrlInput = fixture.nativeElement.querySelector('[name="imageSource"]');
    submitButton = fixture.nativeElement.querySelector('#submit');

    return fixture.whenStable();
  });

  describe('without query param', () => {
    let saveComplaintObserver: Observer<Complaint>;

    beforeEach(() => {
      complaintService.saveComplaint.and.returnValue(
        Observable.create(observer => saveComplaintObserver = observer)
      );
    });

    it('should be empty', () => {
      expect(nameInput.value).toBe('');
      expect(emailInput.value).toBe('');
      expect(phoneInput.value).toBe('');
      expect(subjectInput.value).toBe('');
      expect(contentInput.value).toBe('');
      expect(imageUrlInput.value).toBe('');
    });

    it('should only be submitted if form is valid', () => {
      expect(submitButton.disabled).toBe(true);

      writeValue(nameInput, newComplaint.name);
      expect(submitButton.disabled).toBe(true);
      writeValue(emailInput, newComplaint.email);
      expect(submitButton.disabled).toBe(true);
      writeValue(subjectInput, newComplaint.subject);
      expect(submitButton.disabled).toBe(false);
    });

    it('should save the complaint', () => {
      fillForm(newComplaint);
      submitButton.click();

      expect(complaintService.saveComplaint).toHaveBeenCalledWith(new NewComplaint(newComplaint));
      saveComplaintObserver.next(new Complaint(complaint));
      expect(snackBar.open).toHaveBeenCalledWith('Complaint saved', 'OK');
    });

    it('should not submit the form if there is a save in progress', () => {
      fillForm(newComplaint);
      submitButton.click();

      expect(submitButton.disabled).toBe(true);
    });

    it('should tell whether there are any unsaved changes or not', () => {
      expect(component.hasUnsavedChanges()).toBe(false);
      writeValue(nameInput, 'test');
      expect(component.hasUnsavedChanges()).toBe(true);
    });
  });

  describe('with query param', () => {
    let updateComplaintObserver: Observer<Complaint>;
    let updatedComplaint: Complaint;

    beforeEach(() => {
      complaintService.getComplaint.and.returnValue(of(new Complaint(complaint)));
      complaintService.updateComplaint.and.callFake(
        param => {
          updatedComplaint = param;
          return Observable.create(observer => updateComplaintObserver = observer)
        }
      );
    });

    beforeEach(async() => {
      const router: Router = TestBed.get(Router);
      await router.navigate([ '' ], { queryParams: { id: complaint.id } });
      fixture.detectChanges();
      await fixture.whenStable();
    });

    it('should load the component into the form', () => {
      expect(nameInput.value).toBe(newComplaint.name);
      expect(emailInput.value).toBe(newComplaint.email);
      expect(phoneInput.value).toBe(newComplaint.phoneNumber);
      expect(subjectInput.value).toBe(newComplaint.subject);
      expect(contentInput.value).toBe(newComplaint.content);
      expect(imageUrlInput.value).toBe(newComplaint.imageSource);
    });

    it('should be submitted', () => {
      expect(submitButton.disabled).toBe(false);
    });

    it('should update the complaint', () => {
      submitButton.click();

      expect(complaintService.updateComplaint).toHaveBeenCalledWith(complaint.id, new Complaint(complaint));
      updateComplaintObserver.next(updatedComplaint);
      expect(snackBar.open).toHaveBeenCalled();
    });

    it('should be resubmitted after an error', () => {
      submitButton.click();
      updateComplaintObserver.error(new Error());
      fixture.detectChanges();
      expect(submitButton.disabled).toBe(false);
    });
  });

  const writeValue = (input: HTMLInputElement, value: string) => {
    input.value = value;
    input.dispatchEvent(new Event('input'));
  }

  const fillForm = (complaint: NewComplaint) => {
    writeValue(nameInput, complaint.name);
    writeValue(emailInput, complaint.email);
    writeValue(phoneInput, complaint.phoneNumber);
    writeValue(subjectInput, complaint.subject);
    writeValue(contentInput, complaint.content);
    writeValue(imageUrlInput, complaint.imageSource);
  }

});
