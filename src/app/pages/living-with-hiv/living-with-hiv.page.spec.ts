import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LivingWithHIVPage } from './living-with-hiv.page';

describe('LivingWithHIVPage', () => {
  let component: LivingWithHIVPage;
  let fixture: ComponentFixture<LivingWithHIVPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LivingWithHIVPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
