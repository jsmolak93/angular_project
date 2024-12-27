/*
Authors: Russell Bisker, Jonahtan Hus, John Smolak
This file configures navigation in our app, mapping paths to components: it loads EmptyComponent for the root path, SurveyListComponent for /surveys, and 
SurveyFormComponent for both submitting (/submit) and editing (/edit/:id) surveys, with a fallback to the root for undefined routes.
*/

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SurveyFormComponent } from './survey-form/survey-form.component';
import { SurveyListComponent } from './survey-list/survey-list.component';
import { EmptyComponent } from './empty/empty.component';  // Import EmptyComponent

const routes: Routes = [
  { path: '', component: EmptyComponent },
  { path: 'surveys', component: SurveyListComponent },
  { path: 'submit', component: SurveyFormComponent },
  { path: 'edit/:id', component: SurveyFormComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
