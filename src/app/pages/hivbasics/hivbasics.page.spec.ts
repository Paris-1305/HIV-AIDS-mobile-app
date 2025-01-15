import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HIVBasicsPage } from './hivbasics.page';

describe('HIVBasicsPage', () => {
  let component: HIVBasicsPage;
  let fixture: ComponentFixture<HIVBasicsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HIVBasicsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
