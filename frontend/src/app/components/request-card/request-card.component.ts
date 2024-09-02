import {Component, Input, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-request-card',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './request-card.component.html',
})
export class RequestCardComponent implements OnInit {
  @Input() request: any;
  donatorsCount = 0;
  constructor() { }

  ngOnInit(): void {
    this.donatorsCount = Object.keys(Object.groupBy(this.request.donations, (x: any) => x.donatorId)).length;
  }

  getCategory(category: string): string {
    switch (category) {
      case "games":
        return "Jogos";
      case "life":
        return "Saúde";
      case "music":
        return "Música";
      case "reform":
        return "Reforma";
      case "emergency":
        return "Emergência";
      case "hospital":
        return "Hospitalar";
      default:
        return "Jogos";
    }
  }

  protected readonly Math = Math;
}
