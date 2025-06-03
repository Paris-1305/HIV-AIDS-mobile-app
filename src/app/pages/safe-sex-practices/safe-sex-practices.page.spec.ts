import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SafeSexPracticesPage } from './safe-sex-practices.page';

describe('SafeSexPracticesPage', () => {
  let component: SafeSexPracticesPage;
  let fixture: ComponentFixture<SafeSexPracticesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SafeSexPracticesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
