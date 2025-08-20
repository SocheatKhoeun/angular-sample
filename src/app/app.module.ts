import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './components/app.component';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule, // <-- Add this line
    AppComponent // <-- Import the standalone component here
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }