import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuestionsComponent } from './questions/questions.component';
import { LoginComponent } from './voc/login/login.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';

const routes: Routes = [

  // { path: '', redirectTo: 'WelcomePage', pathMatch: 'full' }, 
  { path: '', redirectTo: 'login', pathMatch: 'full' }, 
  { path:'login',component:LoginComponent},
  { path:'WelcomePage',component:WelcomePageComponent},
  { path:'questions',component:QuestionsComponent},
 


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
