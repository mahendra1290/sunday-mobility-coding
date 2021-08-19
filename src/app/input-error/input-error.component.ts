import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-input-error',
  templateUrl: './input-error.component.html',
  styleUrls: ['./input-error.component.sass'],
})
export class InputErrorComponent implements OnInit {
  @Input()
  fieldControl!: AbstractControl | null;

  @Input()
  hint: string = '';

  @Input()
  fieldName!: string;

  constructor() {}

  ngOnInit(): void {}
}
