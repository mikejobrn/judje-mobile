import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExcluirContaPage } from './excluir-conta.page';

describe('ExcluirContaPage', () => {
  let component: ExcluirContaPage;
  let fixture: ComponentFixture<ExcluirContaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ExcluirContaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
