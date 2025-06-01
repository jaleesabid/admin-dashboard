import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttractionFormDialogComponent } from './attraction-form-dialog.component';

describe('UserFormDialogComponent', () => {
  let component: AttractionFormDialogComponent;
  let fixture: ComponentFixture<AttractionFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttractionFormDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AttractionFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
