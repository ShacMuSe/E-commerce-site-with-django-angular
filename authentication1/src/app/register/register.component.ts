import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { User } from '../user';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  user:User = {
    name: '',
    email:'',
    password:''
  }

  constructor(private apiService:ApiService, private router: Router,private navigator:Router){
   
  }

  register_user(name:string,email:string,password:string){
        this.user.name = name,
        this.user.email = email,
        this.user.password = password
        this.apiService.register_user(this.user).subscribe(
          data => {
            console.log('Registration successfully completed', data)
            this.router.navigate(['login'])
          },
          error => {
            console.error(error)
          }
        )
  }
  navigateToLogin(){
    this.router.navigate(['login'])
  }

}