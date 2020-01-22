import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { LoginComponent } from './routes/login/login.component';
import { SignupComponent } from './routes/signup/signup.component';
import { LayoutComponent } from './layout/layout.component';
import { LoginGuard } from './guards/login.guard';
import { AutoLoginGuard } from './guards/auto-login.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [ AutoLoginGuard ]
  },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [ AutoLoginGuard ]
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [ LoginGuard ],
    children: [
      {
        path: 'map',
        loadChildren: () => import('./routes/map/map.module').then(m => m.MapModule) 
      },
      {
        path: "**", pathMatch: 'full', redirectTo: 'map'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
