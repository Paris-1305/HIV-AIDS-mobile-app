import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HIVPage } from './hiv.page';

describe('HIVPage', () => {
  let component: HIVPage;
  let fixture: ComponentFixture<HIVPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HIVPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
