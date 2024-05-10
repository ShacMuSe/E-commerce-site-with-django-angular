import { ApiService } from './../api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  isLoggedIn: boolean = false;
  userEmail: string ='';

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    // Check if user is already logged in on component initialization
    this.checkLoginStatus();
  }

  checkLoginStatus(): void {
    this.apiService.getUser().subscribe(
      (user) => {
        console.log('User is logged in');
        this.isLoggedIn = true;
        this.userEmail=user.email;
      },
      (error) => {
        console.log('User is not logged in or unauthorized');
        this.isLoggedIn = false;
        this.userEmail='';
      }
    );
  }

  

  logout(): void {
    this.apiService.logout_user().subscribe(
      (data) => {
        console.log(data);
        this.isLoggedIn = false;
        // Optionally, perform additional actions after logout
      },
      (error) => {
        console.error('Error logging out:', error);
        // Handle error, display error message, etc.
      }
    );
  }
}
