import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelperComponent } from './helper.component';
import { NavBarComponent } from '../../nav-bar/nav-bar.component';

describe('HelperComponent', () => {
  let component: HelperComponent;
  let fixture: ComponentFixture<HelperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HelperComponent, NavBarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HelperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
