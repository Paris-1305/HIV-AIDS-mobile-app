import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StayingHealthyPage } from './staying-healthy.page';

describe('StayingHealthyPage', () => {
  let component: StayingHealthyPage;
  let fixture: ComponentFixture<StayingHealthyPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(StayingHealthyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
