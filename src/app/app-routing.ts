import {NgModule}             from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import  {
  HomeComponent,
  RegisterComponent,
  LoginComponent,
  TasksComponent,
  UsersComponent,
  TaskComponent,
  PagenotfoundComponent
} from './components';
import { AuthGuard } from './common/auth.guard';
const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', redirectTo: '', pathMatch: 'full'},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'tasks', component: TasksComponent},
  {path: 'task/:id', component: TaskComponent},
  {path: 'users', component: UsersComponent, canActivate: [AuthGuard]},
  {path: '**', component: PagenotfoundComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
