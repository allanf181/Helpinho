import {Component, Input} from '@angular/core';
import {NgClass, NgIf} from "@angular/common";

@Component({
  selector: 'app-step',
  standalone: true,
  imports: [
    NgIf,
    NgClass
  ],
  templateUrl: './step.component.html',
})
export class StepComponent {
  @Input() step: number = 1;
}
