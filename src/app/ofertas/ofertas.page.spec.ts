import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OfertasPage } from './ofertas.page';

describe('OfertasPage', () => {
  let component: OfertasPage;
  let fixture: ComponentFixture<OfertasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(OfertasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
