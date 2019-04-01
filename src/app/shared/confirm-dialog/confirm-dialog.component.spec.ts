import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDialogComponent } from './confirm-dialog.component';
import { MatDialogModule, MatButtonModule, MAT_DIALOG_DATA } from '@angular/material';

describe('ConfirmDialogComponent', () => {
  let component: ConfirmDialogComponent;
  let fixture: ComponentFixture<ConfirmDialogComponent>;
  let dialogData;

  beforeEach(async(() => {
    dialogData = {};

    TestBed.configureTestingModule({
      declarations: [ ConfirmDialogComponent ],
      imports: [ MatDialogModule, MatButtonModule ],
      providers: [ { provide: MAT_DIALOG_DATA, useValue: dialogData } ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});