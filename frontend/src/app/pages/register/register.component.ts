import {Component} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {HttpClient} from "@angular/common/http";
import {Router, RouterLink} from "@angular/router";
import {NgxMaskDirective} from "ngx-mask";
import {InputComponent} from "../../components/input/input.component";

@Component({
  standalone: true,
  selector: 'app-register',
  templateUrl: './register.component.html',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    NgxMaskDirective,
    RouterLink,
    InputComponent
  ]
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
  ) {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      dataNascimento: ['', [Validators.pattern('[0-9]{2}/[0-9]{2}/[0-9]{4}')]],
      cpf: ['', [Validators.required, Validators.pattern('[0-9]{11}')]],
    });
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      alert('Preencha todos os campos com *');
      return;
    }
    this.http.post('http://localhost:3000/users', this.registerForm.value).subscribe((response: any) => {
      console.log(response);
      localStorage.setItem('token', response.token);
      this.router.navigate(['/']);
    }, error => {
      alert('Erro ao criar conta');
      console.log(error);
    });
  }
}
