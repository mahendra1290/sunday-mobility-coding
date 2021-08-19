import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-input-error',
  templateUrl: './input-error.component.html',
  styleUrls: ['./input-error.component.sass'],
})
export class InputErrorComponent implements OnInit {
  @Input()
  formControl!: AbstractControl;

  constructor() {}

  ngOnInit(): void {}
}
