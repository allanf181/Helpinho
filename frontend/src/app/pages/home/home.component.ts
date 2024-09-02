import {Component, OnInit} from '@angular/core';
import {NavBarComponent} from "../../components/nav-bar/nav-bar.component";
import {RouterLink} from "@angular/router";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {InputComponent} from "../../components/input/input.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgxMaskDirective} from "ngx-mask";
import {HttpClient, HttpParams} from "@angular/common/http";
import {RequestCardComponent} from "../../components/request-card/request-card.component";
import {Observable} from "rxjs";

@Component({
  standalone: true,
  imports: [NavBarComponent, RouterLink, NgIf, InputComponent, FormsModule, NgxMaskDirective, ReactiveFormsModule, NgForOf, RequestCardComponent, AsyncPipe],
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit{
  user: any | null = null;
  constructor(
    private http: HttpClient,
  ) {

  }


  donatedCount: number | undefined;
  requestCount: number | undefined;
  sumDonated: string | undefined;
  requests: any | undefined;

  getUser = (user: any) => {
    this.user = user;
    this.http.get(`http://localhost:3000/users/${user.id}/requests`).subscribe((response: any) => {
      console.log(response);
      this.requestCount = response.length;
    }, error => {
      console.log(error);
    });
    this.http.get(`http://localhost:3000/users/${user.id}/donations`).subscribe((response: any) => {
      console.log(response);
      this.donatedCount = Object.keys(Object.groupBy(response, (x: any) => x.requestId)).length
      this.sumDonated = response.reduce((acc:number, curr: any) => acc + curr.amount, 0).toLocaleString(undefined, {minimumFractionDigits: 2});
    }, error => {
      console.log(error);
    });
  }

  ngOnInit(): void {
    const options = { params: new HttpParams().set('includeDonations', 'true') };
    this.http.get('http://localhost:3000/requests', options).subscribe((response: any) => {
      console.log(response);
      this.requests = response;
    }, error => {
      console.log(error);
    });
  }

  trackByFn(index: number, request: any): any {
    console.log(request);
    return request.requestId;
  }
}
