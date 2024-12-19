import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutPagesComponent } from './checkout-pages.component';

describe('CheckoutPagesComponent', () => {
  let component: CheckoutPagesComponent;
  let fixture: ComponentFixture<CheckoutPagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckoutPagesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckoutPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
