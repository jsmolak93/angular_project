/*
Authors: Russell Bisker, Jonahtan Hus, John Smolak
This component manages the logic for creating and editing the student survey forms. It dynamically loads survey data for editing if an ID is present in the route, 
maps form data to API formats, and handles form submissions for both creating new surveys and updating existing ones. 
*/

import { Component } from '@angular/core';
import { SurveyService } from '../survey.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-survey-form',
  templateUrl: './survey-form.component.html',
  styleUrls: ['./survey-form.component.css']
})

export class SurveyFormComponent {

  constructor(
    private surveyService: SurveyService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  surveyId: number | null = null; // To track if we are editing a survey

  //setup formData object
  formData = {
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipcode: '',
    telephone: '',
    email: '',
    survey_date: new Date().toLocaleDateString('en-CA'),  //by default populate today's date based on user's local timezone
    likes: [] as string [],
    interest: '',
    recommendation: '',
    comments: ''
  };

    //user friendly names for likes and interest
    campusLikes = ['Students', 'Location', 'Campus', 'Atmosphere', 'Dorm Rooms', 'Sports'];
    interestSources = ['Friends', 'Television', 'Internet', 'Other'];

    // API mappings
    likesApiMapping: Record<string, string> = {
      'Students': 'STUDENTS',
      'Location': 'LOCATION',
      'Campus': 'CAMPUS',
      'Atmosphere': 'ATMOSPHERE',
      'Dorm Rooms': 'DORM_ROOMS',
      'Sports': 'SPORTS'
    };

    interestApiMapping: Record<string, string> = {
      'Friends': 'FRIENDS',
      'Television': 'TELEVISION',
      'Internet': 'INTERNET',
      'Other': 'OTHER'
    };

    recommendApiMapping: Record<string, string> = {
      'Likely': 'LIKELY',
      'Unlikely': 'UNLIKELY',
      'Very Likely': 'VERY_LIKELY',
    };

  //checks whether or not loading an exisiting survey 
  ngOnInit(): void {
    // Check if there's an ID in the route
    const id = this.route.snapshot.paramMap.get('id');
    // console.log('Survey ID from route:', id); // Debugging line
    if (id) {
      this.surveyId = +id;
      this.loadSurvey(this.surveyId); // Load the survey data for editing
    }
  }

  //loads existing survey (based on id #) data into form for editing
  loadSurvey(id: number): void {
    this.surveyService.getSurveyById(id).subscribe({
      next: (data) => {
        // Populate formData with data from the survey
        this.formData = {
          ...data,
          // Transform likes from API data to user viewable format
          likes: data.likes && data.likes.length > 0 ? 
            data.likes.map((like: string) => 
              Object.keys(this.likesApiMapping).find(key => this.likesApiMapping[key] === like)
            ) : [],  // If likes is empty, set it to an empty array
          // Transform interest from API data to user viewable format
          interest: Object.keys(this.interestApiMapping).find(key => this.interestApiMapping[key] === data.interest) || "",
          // Transform recommendation from API data to user viewable format
          recommendation: Object.keys(this.recommendApiMapping).find(key => this.recommendApiMapping[key] === data.recommendation) || "",
        };
      },
      error: (err) => {
        alert('An error occurred while loading the survey.');
      }
    });
  }

    //handles submission of survey form both for new forms and edits
    onSubmit(surveyForm: any) {
    
      const transformedData = {
        ...this.formData,
        likes: this.formData.likes.map(like => this.likesApiMapping[like]), // Transform campusLikes
        interest: this.interestApiMapping[this.formData.interest], // Transform interestSource
        recommendation: this.recommendApiMapping[this.formData.recommendation], // Transform recommendation likelihood
        survey_date: this.formData.survey_date ? new Date(this.formData.survey_date).toISOString().split('T')[0] : "" // Ensure string format
      };

      if (this.surveyId) {
        // Editing an existing survey
        this.surveyService.updateSurvey(this.surveyId, transformedData).subscribe({
          next: () => {
            alert('Survey updated successfully!');
            this.router.navigate(['/surveys']); // Redirect after update
          },
          error: () => {
            alert('An error occurred while updating the survey.');
          }
        });
      } else {  //Creating a new survey
          this.surveyService.createSurvey(transformedData).subscribe({
            next: (response) => {
              alert('Survey submitted successfully!');
              this.router.navigate(['/surveys']); // Redirect after update
            },
            error: (err) => {
              // console.log(transformedData);
              alert('An error occurred while submitting the survey.');
            },
            complete: () => {
              console.log('Submission complete');
            }
          });
        } 
  } 
  
  // Resets form fields
  onCancel() {
    this.formData = {
      firstName: '',
      lastName: '',
      address: '',
      city: '',
      state: '',
      zipcode: '',
      telephone: '',
      email: '',
      survey_date: '',
      likes: [],
      interest: '',
      recommendation: '',
      comments: ''
    };
  }

  //handles likes checkboxes so that boxes can be checked/unchecked independently
  onCheckboxChange(event: Event, option: string) {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.formData.likes.push(option); // Add to selected array
    } else {
      this.formData.likes = this.formData.likes.filter(
        (item) => item !== option
      ); // Remove from selected array
    }
  }
}
