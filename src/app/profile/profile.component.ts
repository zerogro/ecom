import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user.model';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user: User | null = null;
  email: string = ''; // Ensure this is populated correctly

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    // Assuming you set the email upon login
    this.email = localStorage.getItem('userEmail') || ''; // Adjust as necessary
    this.getUserProfile();
  }

  getUserProfile(): void {
    if (!this.email) {
      console.error('Email is not set. Cannot fetch user profile.');
      return;
    }

    this.userService.getUserProfile(this.email).subscribe(
      (data) => {
        this.user = data;
      },
      (error) => {
        console.error('Error fetching user profile:', error);
      }
    );
  }
}
