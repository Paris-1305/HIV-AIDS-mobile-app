import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HIVStigmaPage } from './hivstigma.page';

describe('HIVStigmaPage', () => {
  let component: HIVStigmaPage;
  let fixture: ComponentFixture<HIVStigmaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HIVStigmaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
