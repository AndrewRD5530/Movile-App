import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginCreatePage } from './login-create.page';

describe('LoginCreatePage', () => {
  let component: LoginCreatePage;
  let fixture: ComponentFixture<LoginCreatePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
