import {Component, Input, OnInit} from '@angular/core';
import {InputComponent} from "../../components/input/input.component";
import {NavBarComponent} from "../../components/nav-bar/nav-bar.component";
import {NgIf} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {StepComponent} from "../new-request/step/step.component";
import {RequestCardComponent} from "../../components/request-card/request-card.component";
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-request-view',
  standalone: true,
  imports: [
    InputComponent,
    NavBarComponent,
    NgIf,
    ReactiveFormsModule,
    StepComponent,
    RequestCardComponent
  ],
  templateUrl: './request-view.component.html',
})
export class RequestViewComponent implements OnInit {
  request: any = null;
  requestId: string | undefined;
  sumDonated: number = 0;
  constructor(private route: ActivatedRoute, private http: HttpClient) {
    this.route.paramMap.subscribe((params: any) => {
      this.requestId = params.get('requestId');
    });
  }
  ngOnInit(): void {
    this.http.get(`http://localhost:3000/requests/${this.requestId}`).subscribe((response: any) => {
      this.request = response;
      this.sumDonated = this.request.donations?.reduce((acc: any, donation: { amount: any; }) => acc + donation.amount, 0);
    });
  }
}
