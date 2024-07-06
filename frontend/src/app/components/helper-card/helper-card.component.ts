import { Component, Input } from '@angular/core';
import { Helper } from '../../../types/helper.types';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-helper-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './helper-card.component.html',
  styleUrl: './helper-card.component.css',
})
export class HelperCardComponent {
  @Input() helper: Helper = {
    id: 0,
    requester: 0,
    title: 'default',
    description: 'default',
    image: 'image',
    goal: 10000,
    donate_quantity: 50,
    parcial_amount: 0,
  };
}
