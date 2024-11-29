import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeguimientodeusuarioComponent } from './seguimientodeusuario.component';

describe('SeguimientodeusuarioComponent', () => {
  let component: SeguimientodeusuarioComponent;
  let fixture: ComponentFixture<SeguimientodeusuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeguimientodeusuarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeguimientodeusuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
