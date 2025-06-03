import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HivYouthPage } from './hiv-youth.page';

describe('HivYouthPage', () => {
  let component: HivYouthPage;
  let fixture: ComponentFixture<HivYouthPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HivYouthPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
