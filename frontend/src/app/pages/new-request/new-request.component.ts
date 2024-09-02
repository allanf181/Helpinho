import { Component } from '@angular/core';
import {NavBarComponent} from "../../components/nav-bar/nav-bar.component";
import {Router} from "@angular/router";
import {NgIf, NgSwitch, NgSwitchCase} from "@angular/common";
import {StepComponent} from "./step/step.component";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {InputComponent} from "../../components/input/input.component";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-new-request',
  standalone: true,
  imports: [
    NavBarComponent,
    NgSwitch,
    NgSwitchCase,
    StepComponent,
    NgIf,
    ReactiveFormsModule,
    InputComponent
  ],
  templateUrl: './new-request.component.html',
})
export class NewRequestComponent {
  step: number = 1;
  newRequestForm: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private http: HttpClient,
  ) {
    this.newRequestForm = this.formBuilder.group({
      category: ['', Validators.required],
      title: ['', Validators.required],
      imageBinary: [''],
      image: [''],
      description: ['', Validators.required],
      target: ['', Validators.required],
    });
    const token = localStorage.getItem('token');
    if(!token){
      this.router.navigate(['/login']);
    }
  }

  nextStep(){

    console.log(JSON.stringify(this.newRequestForm.value));
    if(this.step === 4){
      this.onSubmit();
    }
    this.step++;
    console.log(structuredClone(this.newRequestForm.value));

  }

  back(){
    this.step--;
    if(this.step === 0){
      this.router.navigate(['/home']);
    }
  }

  handleImage(event: any){
    console.log(event.target.files);
    let files = event.target.files;
    let file = files[0];

    if (files && file) {
      const reader = new FileReader();

      reader.onload = (readerEvt: any) => {
        let binaryString = readerEvt.target.result;
        this.newRequestForm.patchValue({
          image: btoa(binaryString),
        });
      };

      reader.readAsBinaryString(file);
    }

    console.log(this.newRequestForm.value);

  }

  onSubmit(){
    console.log(this.newRequestForm.value);
    if (this.newRequestForm.invalid) {
      alert('Preencha todos os campos');
      return;
    }

    this.http.post('http://localhost:3000/requests', this.newRequestForm.value, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    }).subscribe((response: any) => {
      console.log(response);
      if(response.status === 200){
        this.router.navigate([`/request/${response}`]);
      }
    }, error => {
      alert('Erro ao criar conta');
      console.log(error);
    });
  }

  protected readonly event = event;
}
