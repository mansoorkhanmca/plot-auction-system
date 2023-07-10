import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanDeactivate} from '@angular/router';
import { UsersService } from './users.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private usersService:UsersService,private router:Router) { }

  canActivate(): boolean {
    console.log('this.usersService.isUserLoggedIn',this.usersService.isUserLoggedIn());
    if(!this.usersService.isUserLoggedIn()){
      this.router.navigateByUrl('/login');
    }
    return true;
  }
}

// export interface ComponentCanDeactivate {
//   canDeactivate: () => boolean | Promise<boolean> | Observable<boolean>;
// }

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthGuardService implements CanDeactivate<ComponentCanDeactivate> {
//   constructor(private usersService:UsersService,private router:Router) { }
//   canDeactivate(
//     component: ComponentCanDeactivate): boolean | Promise<boolean> | Observable<boolean> {
//       //return component.canDeactivate ? component.canDeactivate() : true;
//       return  true;
    
//   }
// }
