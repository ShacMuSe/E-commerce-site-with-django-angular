import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit{
  
  user!:any;

  constructor(private apiService:ApiService,private router: Router){
    this.user = {name:'',email:'',password:''}
  }

  ngOnInit(): void {
     this.apiService.getUser().subscribe(
      data => {
        console.log('data taken succesfully', data)
        this.user = data
      },
      error => {
        console.error('error is here !!!',error)
        this.router.navigate(['login'])
      }
     )
  }

  logout(){
    this.apiService.logout_user().subscribe(
      data => {
        console.log(data)
        this.router.navigate(['login'])
      },
      error => {
        console.error(error)
      }
    )
  }

}