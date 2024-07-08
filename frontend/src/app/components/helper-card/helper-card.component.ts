import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HelpRequest } from '../../models/helper.model';
import { helpers } from '../../../integration/helper';

@Component({
  selector: 'app-helper-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './helper-card.component.html',
  styleUrl: './helper-card.component.css',
})
export class HelperCardComponent {
  @Input() helper: HelpRequest = helpers[0];
  constructor() {
    console.log(this.helper);
  }
}
