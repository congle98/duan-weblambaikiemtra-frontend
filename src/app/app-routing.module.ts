import { LoginGuard } from './login.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './admin.guard';
import { AddCategoryComponent } from './pages/admin/add-category/add-category.component';
import { AddQuestionComponent } from './pages/admin/add-question/add-question.component';
import { AddQuizComponent } from './pages/admin/add-quiz/add-quiz.component';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { UpdateQuizComponent } from './pages/admin/update-quiz/update-quiz.component';
import { ViewCategoriesComponent } from './pages/admin/view-categories/view-categories.component';
import { ViewQuizQuestionsComponent } from './pages/admin/view-quiz-questions/view-quiz-questions.component';
import { ViewQuizzesComponent } from './pages/admin/view-quizzes/view-quizzes.component';
import { WelcomeComponent } from './pages/admin/welcome/welcome.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SignupComponent } from './pages/signup/signup.component';
import { InstructionsComponent } from './pages/user/instructions/instructions.component';
import { LoadQuizComponent } from './pages/user/load-quiz/load-quiz.component';
import { StartComponent } from './pages/user/start/start.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { UserGuard } from './user.guard';

const routes: Routes = [
  {
    path:'signup',
    component: SignupComponent
  },
  {
    path:'login', 
    component:LoginComponent
  },
  {
    path:'',
    component:WelcomeComponent
  },
  // {
  //   path:'profile',
  //   component:ProfileComponent,
  //   canActivate:[LoginGuard]
  // },
  {
    path:'admin',
    component:AdminDashboardComponent,
    canActivate:[AdminGuard],
    children:[
      {
        path:'',
        component:HomeComponent
      },
     
      {
        path:'categories',
        component:ViewCategoriesComponent
      },
      {
        path:'add-category',
        component:AddCategoryComponent
      },
      {
        path:'profile',
        component:ProfileComponent,
       
      },
      {
        path:'quizzes',
        component:ViewQuizzesComponent
      },
      {
        path:'add-quiz',
        component:AddQuizComponent
      },
      {
        path:'quiz/:id',
        component:UpdateQuizComponent
      },
      {
        path:"view-questions/:quizId/:title",
        component:ViewQuizQuestionsComponent
      },
      {
        path:"add-question/:quizId/:quizTitle",
        component:AddQuestionComponent
      }
    ]
  },
  {
    path:"user-dashboard",
    component:UserDashboardComponent,
    canActivate:[UserGuard],
    children:[
      {
        path:"",
        component:HomeComponent
      },
      {
        path:'profile',
        component:ProfileComponent,
       
      },
      {
        path:":cateId",
        component:LoadQuizComponent
      },
      {
        path:"instructions/:quizId",
        component:InstructionsComponent
      },
     
     
      // {
      //   path:"start/:quizId",
      //   component:StartComponent
      // }
    ]

  },
  {
    path:"start/:quizId",
    component:StartComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
