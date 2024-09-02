import {Component, Input } from '@angular/core';

function styleTransform(value: "solid" | "ghost" | "clear"): { backgroundColor: string, color: string } {
  switch (value) {
    case 'solid':
      return {
        backgroundColor: '500',
        color: 'white'
      };
    case 'ghost':
      return {
        backgroundColor: '100',
        color: '500'
      };
    case 'clear':
      return {
        backgroundColor: 'white',
        color: '500'
      };
    default:
      return {
        backgroundColor: '500',
        color: 'white'
      };
  }
}
/*
All supported colors
text-base-white  bg-base-white
text-base-black  bg-base-black
text-primary-500  bg-primary-500
text-primary-100  bg-primary-100
text-neutral-500  bg-neutral-500
text-neutral-100  bg-neutral-100
text-success-500  bg-success-500
text-success-100  bg-success-100
text-warning-500  bg-warning-500
text-warning-100  bg-warning-100
text-error-500  bg-error-500
text-error-100  bg-error-100
text-secondary-500  bg-secondary-500
text-secondary-100  bg-secondary-100
 */
@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
})
export class ButtonComponent {
  @Input() text: string | undefined;
  @Input({transform: styleTransform}) type: { backgroundColor: string, color: string } = { backgroundColor: '500', color: 'white' };
  @Input() color: "base" | "neutral" | "primary" | "secondary" | "success" | "warning" | "error" = "primary";
  @Input() size: "sm" | "md" | "lg" | "xl" = "sm";
}

