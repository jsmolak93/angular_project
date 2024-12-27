/*
Authors: Russell Bisker, Jonahtan Hus, Jon Smolak
This component displays the list of completed surveys and provides options to edit or delete them. It uses the SurveyService to fetch surveys from the 
backend (loadSurveys()), navigate to the edit page (onEdit()), or delete a specific survey (onDelete()). The ngOnDestroy lifecycle hook ensures cleanup of 
subscriptions to avoid memory leaks. It communicates with the backend and updates the displayed survey list dynamically.
*/

import { Component, OnInit, OnDestroy } from '@angular/core';
import { SurveyService } from '../survey.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-survey-list',
  templateUrl: './survey-list.component.html',
  styleUrls: ['./survey-list.component.css']
})
export class SurveyListComponent implements OnInit, OnDestroy {
  surveys: any[] = [];
  private surveySubscription: Subscription | undefined; // Store the subscription

  constructor(private surveyService: SurveyService, private router: Router) {}

  ngOnInit(): void {
    this.loadSurveys();
  }

  ngOnDestroy(): void {
    // Clean up any active subscriptions when the component is destroyed
    if (this.surveySubscription) {
      this.surveySubscription.unsubscribe();
    }
  }

  loadSurveys(): void {
    this.surveyService.getSurveys().subscribe({
      next: (data) => {
        this.surveys = data; // handle the received data
      },
      error: (error) => {
        console.error('Error fetching surveys:', error); // handle error
      },
      complete: () => {
        console.log('Survey data loaded successfully'); // handle completion
      }
    });
  }

  onEdit(id: number): void {
    this.router.navigate(['/edit', id]);
  }

  onDelete(id: number): void {
    this.surveyService.deleteSurvey(id).subscribe(() => {
      this.loadSurveys();
    });
  }
}
