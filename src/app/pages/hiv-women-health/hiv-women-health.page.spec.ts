import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HivWomenHealthPage } from './hiv-women-health.page';

describe('HivWomenHealthPage', () => {
  let component: HivWomenHealthPage;
  let fixture: ComponentFixture<HivWomenHealthPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HivWomenHealthPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
