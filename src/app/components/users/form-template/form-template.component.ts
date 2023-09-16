import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectUserError, State } from '../../../reducers';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { User } from '../../../model/User';

@Component({
  selector: 'app-form-template',
  template: `
    <div class="wrapper ">

      <hr>
      <form novalidate [formGroup]="createUserForm" class="example-form text-center" (ngSubmit)="onSubmit()">
        <div class="line1 w-full">
          <mat-form-field class=" p-2 w-1/2 float-left">
            <mat-label>First name</mat-label>
            <input formControlName="firstName" matInput placeholder="Khuong" name="firstName" required
                   type="text"
                   [value]="user?.firstname!"
            >
            <mat-error>First name is required!!</mat-error>
          </mat-form-field>
          <mat-form-field class="p-2 w-1/2 float-right">
            <mat-label>Last name</mat-label>
            <input formControlName="lastName" matInput placeholder="Khuong" name="lastName" required
                   [value]="user?.lastname!"
                   type="text">
            <mat-error>Last name is required!!</mat-error>
          </mat-form-field>
        </div>

        <div class="line2">
          <mat-form-field class="p-2" [ngClass]="isEdited ?'w-full':'w-1/2' ">
            <mat-label>Email</mat-label>
            <input formControlName="email" matInput placeholder="abc@gmail.com" name="email" required="true"
                   [value]="user?.username!"
                   type="email">
            <mat-error>
              Email is required!!!
            </mat-error>
          </mat-form-field>
          <mat-form-field class="w-1/2 p-2" *ngIf="!isEdited">
            <mat-label>Password</mat-label>
            <input pattern="^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,}$" [type]="showPassword ? 'text' : 'password'"
                   formControlName="password" matInput required name="password">
            <mat-icon matSuffix
                      (click)="toggleShowPassword()">  {{showPassword ? 'visibility_off' : 'visibility'}}</mat-icon>
            <mat-error>Password is Invalid! Password must be a combination of lower-case, upper-case, numbers and at
              least 9
              characters long
            </mat-error>
          </mat-form-field>
        </div>
        <div class="line2">
          <mat-form-field class="w-1/2 p-2">
            <mat-label>Phone number</mat-label>
            <input
              formControlName="phoneNum" matInput
              placeholder="0988000548" name="phoneNum"
              [value]="user?.phoneNumber!"
              type="text" id="phoneNum">
            <mat-error>
              Phone number must include from 10 to 12 numbers !
            </mat-error>
          </mat-form-field>
          <div class="w-1/2 p-2 inline-block">
            <mat-checkbox class="float-left my-0" [checked]="user?.status == 'active' ? true:false"
                          formControlName="status">Active
            </mat-checkbox>
          </div>
        </div>
        <hr>
        <div class="line3 mt-3 mr-10">
          <button
            type="submit"
            *ngIf="!isEdited" mat-raised-button color="primary" class="float-right mt-3 mr-10"
            [disabled]="createUserForm.invalid">
            Create
          </button>
        </div>
        <div class="line3 mt-3 mr-10">
          <button
            type="button"
            *ngIf="isEdited" mat-raised-button color="accent" class="float-right mt-3 mr-10"
            [disabled]="createUserForm.invalid" (click)="onCancel()">
            Cancel
          </button>
          <button *ngIf="isEdited" mat-raised-button class="float-right mt-3 mr-10" color="primary"
                  [disabled]="createUserForm.invalid"
                  type="submit">
            Save
          </button>
        </div>
      </form>
    </div>

  `,
  styles: []
})
export class FormTemplateComponent {
  @Input() isEdited: boolean = false;
  @Input() user?: User;
  @Output() onCanceling = new EventEmitter<null>();
  @Output() onCreate = new EventEmitter<{
    username: string, password: string, firstname: string, lastname: string, phoneNumber: string,
    status: string
  }>();

  @Output() onUpdate = new EventEmitter<{
    firstname: string, lastname: string, phoneNumber: string,
    status: string
  }>;

  constructor(private store: Store<State>,
              private snackBar: MatSnackBar) {
  }

  showPassword: boolean = false;
  createUserForm!: FormGroup;

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  onCancel() {
    this.onCanceling.emit();
  }

  onSave() {
    const user: {

      firstname: string, lastname: string, phoneNumber: string,
      status: string
    } = {
      firstname: this.createUserForm.controls['firstName'].value,
      lastname: this.createUserForm.controls['lastName'].value,
      phoneNumber: this.createUserForm.controls['phoneNum'].value.toString(),
      status: this.createUserForm.controls['status'].value == true ? 'active' : 'inactive'
    };
    this.onUpdate.emit(user);
  }

  onSubmit() {
    if (this.isEdited) {
      this.onSave();
    } else {
      this.onCreateUser();
    }

  }

  onCreateUser() {
    const user: {
      username: string, password: string, firstname: string, lastname: string, phoneNumber: string,
      status: string
    } = {
      username: this.createUserForm.controls['email'].value,
      firstname: this.createUserForm.controls['firstName'].value,
      lastname: this.createUserForm.controls['lastName'].value,
      password: this.createUserForm.controls['password'].value,
      phoneNumber: this.createUserForm.controls['phoneNum'].value.toString(),
      status: this.createUserForm.controls['status'].value == true ? 'active' : 'inactive'
    };
    this.onCreate.emit(user);
  }

  ngOnInit() {
    if (this.isEdited) {
      this.createUserForm = new FormGroup({
        firstName: new FormControl(this.user!.firstname, [Validators.required]),
        lastName: new FormControl(this.user!.lastname, [Validators.required]),
        email: new FormControl(this.user!.username, [Validators.email]),
        password: new FormControl(''),
        phoneNum: new FormControl(this.user!.phoneNumber, [Validators.required, Validators.pattern('^(\\\\+)?(84||0)([35789])([0-9]{8})$')]),
        status: new FormControl<boolean>(this.user!.status == 'active' ? true : false)

      });
    } else {
      this.createUserForm = new FormGroup({
        firstName: new FormControl('', [Validators.required]),
        lastName: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.email]),
        password: new FormControl(''),
        phoneNum: new FormControl('', [Validators.required, Validators.pattern('^(\\\\+)?(84||0)([35789])([0-9]{8})$')]),
        status: new FormControl<boolean>(true)

      });
    }

    this.store.select(selectUserError).subscribe(
      (error) => {
        if (error != '') {
          this.snackBar.open(error, 'Dismiss', {
            duration: 5000, // Set the duration to 5 seconds (5000 milliseconds)
          });
        }
      }
    );

  }
}
