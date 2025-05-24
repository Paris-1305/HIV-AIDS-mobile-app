import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FAQSectionPage } from './faqsection.page';

describe('FAQSectionPage', () => {
  let component: FAQSectionPage;
  let fixture: ComponentFixture<FAQSectionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FAQSectionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
