import {booleanAttribute, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import {NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  standalone: true,
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  imports: [
    NgIf,
    RouterLink
  ]
})
export class NavBarComponent implements OnInit {
  @Output() user;
  @Input({transform: booleanAttribute}) showLinks: boolean = true;
  token: any;

  constructor(private jwtHelper: JwtHelperService) {
    this.user = new EventEmitter<any>()
    this.token = this.jwtHelper.decodeToken();
    if(jwtHelper.isTokenExpired()){
      this.logout();
    }
    console.log(this.token);
  }

  logout(){
    localStorage.removeItem('token');
    this.token = null;
  }

  ngOnInit(): void {
    this.user.emit(this.token)
  }
}
