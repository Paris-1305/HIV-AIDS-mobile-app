import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LocationPagePage } from './location-page.page';

describe('LocationPagePage', () => {
  let component: LocationPagePage;
  let fixture: ComponentFixture<LocationPagePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
