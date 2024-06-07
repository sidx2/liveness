import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Qr2Component } from './qr2.component';

describe('Qr2Component', () => {
  let component: Qr2Component;
  let fixture: ComponentFixture<Qr2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Qr2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Qr2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
