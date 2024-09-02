import {HomeComponent} from "./pages/home/home.component";
import {LoginComponent} from "./pages/login/login.component";
import {RegisterComponent} from "./pages/register/register.component";
import {NewRequestComponent} from "./pages/new-request/new-request.component";
import {RequestViewComponent} from "./pages/request-view/request-view.component";

export const routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'new', component: NewRequestComponent },
  { path: 'request/:requestId', component: RequestViewComponent },
];
