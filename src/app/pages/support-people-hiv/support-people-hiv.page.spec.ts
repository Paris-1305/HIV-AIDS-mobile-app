import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SupportPeopleHivPage } from './support-people-hiv.page';

describe('SupportPeopleHivPage', () => {
  let component: SupportPeopleHivPage;
  let fixture: ComponentFixture<SupportPeopleHivPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SupportPeopleHivPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
