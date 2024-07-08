import { Component, OnInit } from '@angular/core';
import { NavBarComponent } from '../../nav-bar/nav-bar.component';
import { HelpRequest } from '../../../models/helper.model';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { helpers } from '../../../../integration/helper';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-helper',
  standalone: true,
  imports: [NavBarComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './helper.component.html',
  styleUrl: './helper.component.css',
})
export class HelperComponent implements OnInit {
  helperForm: FormGroup;
  helperId: number | undefined;
  helper: HelpRequest | undefined;
  percentGoal = 0;

  constructor(private route: ActivatedRoute, private fb: FormBuilder) {
    this.helperForm = this.fb.group({
      amount: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.helperId = Number(params.get('id'));
      this.helper = helpers.find((item) => item.id === this.helperId);
    });
    this.percentGoal =
      (this.helper?.parcial_amount! / this.helper?.goal!) * 100;
  }

  onSubmit() {
    if (this.helperForm.valid) {
      this.makeDonation();
    } else {
      console.log('Form Not Valid');
    }
  }
  makeDonation() {
    console.log('donate');
  }
}
