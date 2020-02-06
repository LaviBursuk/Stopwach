import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { MainPageComponent } from './main-page/mainPage.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    MainPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [MainPageComponent]
})
export class AppModule { }
