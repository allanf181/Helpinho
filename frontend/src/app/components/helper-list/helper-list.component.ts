import { Component, OnInit } from '@angular/core';
import { HelperCardComponent } from '../helper-card/helper-card.component';
// import { Helper } from '../../../types/helper.types';
import { CommonModule } from '@angular/common';
import { helpers } from '../../../integration/helper';
import { HelperService } from '../../services/helper/helper.service';
import { map, Observable } from 'rxjs';
import { HelpRequest, RequestHelper } from '../../models/helper.model';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-helper-list',
  standalone: true,
  imports: [HelperCardComponent, CommonModule, HttpClientModule],
  templateUrl: './helper-list.component.html',
  styleUrl: './helper-list.component.css',
})
export class HelperListComponent implements OnInit {
  helperList$ = new Observable<HelpRequest[]>();
  constructor(private helperService: HelperService) {}

  ngOnInit() {
    this.helperList$ = this.helperService
      .getHelpers()
      .pipe(map((response: RequestHelper) => response.data));
  }
}
