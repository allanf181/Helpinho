import {Component, Input, numberAttribute} from '@angular/core';
import {NgIf} from "@angular/common";
import {FormGroup, ReactiveFormsModule} from "@angular/forms";
import {NgxMaskDirective} from "ngx-mask";

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    NgxMaskDirective
  ],
  templateUrl: './input.component.html',
})
export class InputComponent {
  @Input({required: true}) form!: FormGroup;
  @Input({required: true}) name!: string;
  @Input() label: string = '';
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Input({transform: numberAttribute}) minlength: number = 0;
  @Input() hint: string = '';
  @Input() error: string = '';
  @Input() mask: string = '';
  @Input() dropSpecialCharacters: boolean = true;


  isInvalid(): boolean {
    return this.form.controls[this.name].invalid && this.form.controls[this.name].touched && this.form.controls[this.name].value.length > 0;
  }

  constructor() {  }

}
