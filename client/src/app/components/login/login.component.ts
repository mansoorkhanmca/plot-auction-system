
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  username : string = '';
  password: string = '';
  isInvalidCredentials = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UsersService,
    private snackBar: MatSnackBar
  ) {
  }

  public ngOnInit(): void {
    
  }

  public onSubmit(): void {

  let userCred ={
    email: this.username,
    password: this.password
  }

  this.userService.login(userCred).subscribe(
    (resp)=>{
        this.login();
        //console.log(resp.token);
        this.userService.setUserData(resp);
        this.userService.setToken(resp.token);
    },
    (err)=>{
      console.error(err);
      this.isInvalidCredentials = true;
      //this.showMessage(err.message);
    })

  }

  login(){
    this.router.navigateByUrl('/dashboard')
  }

  singup(){
    this.router.navigateByUrl('/sign-up')
  }

  isEmailValid(): boolean {
    let email = this.username;
    const expression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return expression.test(email);
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
