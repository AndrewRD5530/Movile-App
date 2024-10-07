import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProDescriptionPage } from './pro-description.page';

describe('ProDescriptionPage', () => {
  let component: ProDescriptionPage;
  let fixture: ComponentFixture<ProDescriptionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ProDescriptionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
