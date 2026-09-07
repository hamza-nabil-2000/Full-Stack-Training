import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatAnchor, MatButton, MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogClose, MatDialogRef } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatFormField, MatInput, MatPrefix, MatSuffix } from '@angular/material/input';
import { EcommerceStore } from '../../ecommerce-store';
import { SignUpParams } from '../../models/user';
import { SignInDialog } from '../sign-in-dialog/sign-in-dialog';

@Component({
  selector: 'app-sign-up-dialog',
  imports: [
    MatButtonModule,
    MatDialogClose,
    MatFormField,
    MatInput,
    MatPrefix,
    MatAnchor,
    MatButton,
    ReactiveFormsModule,
    MatIcon,
  ],
  template: `
    <div class="p-8 min-w-[400px] flex flex-col">
      <div class="flex justify-between">
        <div>
          <h2 class="text-xl font-medium mb-1">Sign Up</h2>
          <p class="text-sm text-gray-500">Join us and start shopping today</p>
        </div>

        <button tabindex="-1" matIconButton class="-mt-2 -mr-2" mat-dialog-close="">
          <mat-icon>close</mat-icon>
        </button>
      </div>

      <form [formGroup]="signUpForm" class="mt-6 flex flex-col" (ngSubmit)="signUp()">
        <mat-form-field class="mb-4">
          <input type="text" matInput formControlName="name" placeholder="Enter your Name" />
          <mat-icon matPrefix>person</mat-icon>
        </mat-form-field>

        <mat-form-field class="mb-4">
          <input type="email" matInput formControlName="email" placeholder="Enter your Email" />
          <mat-icon matPrefix>email</mat-icon>
        </mat-form-field>

        <mat-form-field class="mb-4">
          <input
            type="password"
            matInput
            formControlName="password"
            placeholder="Enter your Password"
          />
          <mat-icon matPrefix>lock</mat-icon>
        </mat-form-field>

        <mat-form-field class="mb-6">
          <input
            type="password"
            matInput
            formControlName="confirmPassword"
            placeholder="Confirm your Password"
          />
          <mat-icon matPrefix>lock</mat-icon>
        </mat-form-field>

        <button type="submit" matButton="filled" class="w-full">
          <!-- {{store.loading() ? 'Creating Account...' : 'Create Account'}} -->
          Create Account
        </button>
      </form>

      <p class="text-center text-sm text-gray-500 mt-2">
        Already have an account?
        <a class="text-blue-600 cursor-pointer" (click)="openSignInDialog()">Sign In</a>
      </p>
    </div>
  `,
  styles: ``,
})
export class SignUpDialog {
  fb = inject(NonNullableFormBuilder);

  store = inject(EcommerceStore);

  dialogRef = inject(MatDialogRef);

  data = inject<{ checkout: boolean }>(MAT_DIALOG_DATA);

  matDialog = inject(MatDialog);

  signUpForm = this.fb.group({
    name: ['Hamza Nabil', Validators.required],
    email: ['hamza@gmail.com', [Validators.required, Validators.email]],
    password: ['123456', Validators.required],
    confirmPassword: ['123456', Validators.required],
  });

  signUp() {
    if (this.signUpForm.invalid) {
      return;
    }

    const { name, email, password } = this.signUpForm.value;

    this.store.signUp({
      name,
      email,
      password,
      dialogId: this.dialogRef.id,
      checkout: this.data?.checkout,
    } as SignUpParams);
  }

  openSignInDialog() {
    this.dialogRef.close();
    this.matDialog.open(SignInDialog, {
      disableClose: true,
      data: { checkout: this.data?.checkout },
    });
  }
}
