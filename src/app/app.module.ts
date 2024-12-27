/*
Authors: Russell Bisker, Jonathan Hus, John Smolak
This module sets up the application by declaring the main components (AppComponent, SurveyFormComponent, SurveyListComponent, and EmptyComponent) and importing 
essential modules such as BrowserModule, AppRoutingModule, HttpClientModule, and FormsModule. It serves as the central configuration for bootstrapping the 
application with AppComponent.
*/

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';  // For template-driven forms
import { HttpClientModule } from '@angular/common/http'; // For HTTP requests
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SurveyFormComponent } from './survey-form/survey-form.component';
import { SurveyListComponent } from './survey-list/survey-list.component';
import { EmptyComponent } from './empty/empty.component';

@NgModule({
  declarations: [
    AppComponent,
    SurveyFormComponent,
    SurveyListComponent,
    EmptyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
