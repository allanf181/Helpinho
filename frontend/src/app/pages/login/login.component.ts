import {Component} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {HttpClient} from "@angular/common/http";
import {Router, RouterLink} from "@angular/router";
import {NgIf} from "@angular/common";
import {InputComponent} from "../../components/input/input.component";

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    RouterLink,
    NgIf,
    InputComponent
  ]
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      remember: [false],
    });
  }



  onSubmit(): void {
    console.log(this.loginForm.errors);

    this.http.post('http://localhost:3000/users/login', this.loginForm.value).subscribe((response: any) => {
      console.log(response);
      localStorage.setItem('token', response.token);
      this.router.navigate(['/']);
    }, error => {
      console.log(error);
      if (error.status === 401) {
        alert('Email ou senha incorreta');
        this.loginForm.get('email')?.setErrors({ 'invalid': true });
        this.loginForm.get('password')?.setErrors({ 'invalid': true });
      }
    });
  }
}
