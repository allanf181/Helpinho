import { TestBed } from '@angular/core/testing';

import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let component;
  let fixture;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
