/**
 * This file and `main.node.ts` are identical, at the moment(!)
 * By splitting these, you're able to create logic, imports, etc that are "Platform" specific.
 * If you want your code to be completely Universal and don't need that
 * You can also just have 1 file, that is imported into both
 * client.ts and server.ts
 */

import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule, JsonpModule} from '@angular/http';
import {UniversalModule} from 'angular2-universal';
import {ReactiveFormsModule} from '@angular/forms';
import {AppComponent} from './index';
import  {
  HomeComponent,
  RegisterComponent,
  LoginComponent,
  TasksComponent,
  UsersComponent,
  TaskComponent,
  TaskEditComponent,
  PagenotfoundComponent
} from './components';
import {RouterModule} from '@angular/router';
import {AppRoutingModule} from './app-routing';
import {Constants} from './shared/constants';
import {CommonService} from './shared/service';

/**
 * Top-level NgModule "container"
 */
@NgModule({
  /** Root App Component */
  bootstrap: [AppComponent],
  /** Our Components */
  declarations: [AppComponent, HomeComponent, RegisterComponent, LoginComponent, TasksComponent, UsersComponent, TaskComponent, PagenotfoundComponent, TaskEditComponent],
  imports: [
    /**
     * NOTE: Needs to be your first import (!)
     * BrowserModule, HttpModule, and JsonpModule are included
     */
    BrowserModule,
    HttpModule,
    JsonpModule,
    AppRoutingModule,
    UniversalModule,
    ReactiveFormsModule
    /**
     * using routes
     */

  ],
  providers: [Constants, CommonService]
})
export class AppModule {

}
