import { Component } from '@angular/core';
import { HelperCardComponent } from '../helper-card/helper-card.component';
import { Helper } from '../../../types/helper.types';
import { CommonModule } from '@angular/common';
import { helpers } from '../../../integration/helper';

@Component({
  selector: 'app-helper-list',
  standalone: true,
  imports: [HelperCardComponent, CommonModule],
  templateUrl: './helper-list.component.html',
  styleUrl: './helper-list.component.css',
})
export class HelperListComponent {
  helperList: Helper[] = helpers;
}
