import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  singupForm = new FormGroup({
    firstName: new FormControl('',
      [
        Validators.required,
        //Validators.minLength(3),
        Validators.maxLength(50),
        Validators.pattern(/^[A-Za-z]+$/) 
      ]
    ),
    lastName: new FormControl('',
      [
        Validators.required,
        //Validators.minLength(3),
        Validators.maxLength(50),
        Validators.pattern(/^[A-Za-z]+$/)
      ]),
    gender: new FormControl('',
      [
        Validators.required
      ]),
    mobileNo: new FormControl('',
      [
        Validators.required,
        this.mobileNumberValidator()
      ]),
    email: new FormControl('',
      [Validators.required,
      Validators.email
      ]),
    password: new FormControl('',
      [
        Validators.required,
        Validators.minLength(4)
      ]),
    confirmPassword: new FormControl('',
      [
        Validators.required,
        Validators.minLength(4),
        this.confirmPasswordValidators()
      ]),
    address: new FormControl(),
    city: new FormControl(),
    state: new FormControl(),

  })
  constructor(
    private router: Router, 
    private userService: UsersService,
    private snackBar:MatSnackBar
    ) { }

  ngOnInit(): void {
  }

  cancel() {
    this.router.navigateByUrl('/login');
  }

  signUpFormSubmit() {
    //console.log(this.singupForm.value);

    if (this.singupForm.valid) {
      this.userService.registerNewUser(this.singupForm.value).subscribe(
        (resp) => {
          
          this.router.navigateByUrl('/login');

          this.showMessage('New User Created Successfully');

        },
        (err)=>{
          console.error(err);
          this.showMessage(err.message);
        })
    }
    else {
      console.error('Signup Form not valid');
    }

  }

  get singupFormControl() {
    return this.singupForm.controls;
  }

  mobileNumberValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const isProperMobNomLength = control.value?.toString().length == 10;
      return isProperMobNomLength ? null : { err: { value: control.value } };
    };
  }

  confirmPasswordValidators(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const isbothPasswordEqual = control.value === this.singupForm?.controls?.password?.value;
      return isbothPasswordEqual ? null : { err: { value: control.value } };
    };
  }


  showMessage(message:string){
    this.snackBar.open(message, '', {
      duration: 9000,
      verticalPosition: 'top',
      horizontalPosition: 'right',
      panelClass: ['custom-snackbar'],
    });
  }
}

