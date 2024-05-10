import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { User } from '../user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private apiService: ApiService,private navigator:Router){
    this.user = {name:'',email:'',password:''}
  }

  user!:User

  login(email:string,password:string):void{
    this.user.email = email;
    this.user.password = password
    this.apiService.login_user(this.user)
    .subscribe(
      response => {
        console.log('sucesfully',response)
        localStorage.setItem('jwt',response.jwt)
        this.navigator.navigate(['products'])
      },
      error => {
        console.error('Error',error)
      }
    )
    console.log(this.user)
  }

  navigateToRegister(){
    this.navigator.navigate(['register'])
  }

}