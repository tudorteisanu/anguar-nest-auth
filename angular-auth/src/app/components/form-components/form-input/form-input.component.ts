import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'FormInput',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.css'],
})
export class FormInputComponent implements OnInit {
  @Input() label: string = '';
  @Input() type: string = 'text';
  @Input() control: any = new FormControl('');

  constructor() {}

  ngOnInit(): void {}

  get errors() {
    return this.control.errors;
  }

  get isErrorMessageShown(): boolean {
    return !!this.errorMessage && (this.control.touched || this.control.dirty);
  }

  get errorMessage(): string {
    if (this.errors?.hasOwnProperty('required')) {
      return 'This field is required!'
    }


    if (this.errors?.hasOwnProperty('email')) {
      return 'Invalid email format!'
    }

    return  ''
  }
}
