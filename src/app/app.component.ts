/*
Authors: Russell Bisker, Jonathan Hus, John Smolak
This class defines the root component of the application, managing the main app layout and routing logic. It includes a clearForm method to 
navigate back to the default page using Angular's router.
*/

import { Component } from '@angular/core';
import { Router } from '@angular/router';  // Import the Router

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'SurveyApp';
  constructor(public router: Router) {}  // Inject Router

  clearForm(): void {
    this.router.navigate(['/']);  // Redirect to the surveys list or default page
  }
}
