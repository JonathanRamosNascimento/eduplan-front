import { DisciplinaListComponent } from './components/disciplina-list/disciplina-list.component';
import { DisciplinaNewComponent } from './components/disciplina-new/disciplina-new.component';
import { PlanoDeEnsinoDetailComponent } from './components/plano-de-ensino-detail/plano-de-ensino-detail.component';
import { PlanoDeEnsinoListComponent } from './components/plano-de-ensino-list/plano-de-ensino-list.component';
import { PlanoDeEnsinoNewComponent } from './components/plano-de-ensino-new/plano-de-ensino-new.component';
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./components/security/login/login.component";
import { HomeComponent } from './components/home/home.component';
import { ModuleWithProviders } from "@angular/core";
import { AuthGuard } from './components/security/auth.guard';
import { UserNewComponent } from './components/user-new/user-new.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { DisciplinaDetailComponent } from './components/disciplina-detail/disciplina-detail.component';

export const ROUTES: Routes = [
  { path: 'login' , component: LoginComponent },
  { path: '' , component:  HomeComponent, canActivate: [AuthGuard]},
  { path: 'user-new' , component: UserNewComponent, canActivate: [AuthGuard] },
  { path: 'user-new/:id' , component: UserNewComponent, canActivate: [AuthGuard] },
  { path: 'user-list' , component: UserListComponent, canActivate: [AuthGuard] },
  { path: 'plano-de-ensino-new' , component: PlanoDeEnsinoNewComponent, canActivate: [AuthGuard] },
  { path: 'plano-de-ensino-new/:id' , component: PlanoDeEnsinoNewComponent, canActivate: [AuthGuard] },
  { path: 'plano-de-ensino-list' , component: PlanoDeEnsinoListComponent, canActivate: [AuthGuard] },
  { path: 'plano-de-ensino-detail/:id' , component: PlanoDeEnsinoDetailComponent, canActivate: [AuthGuard] },
  { path: 'disciplina-new' , component: DisciplinaNewComponent, canActivate: [AuthGuard] },
  { path: 'disciplina-new/:id' , component: DisciplinaNewComponent, canActivate: [AuthGuard] },
  { path: 'disciplina-list' , component: DisciplinaListComponent, canActivate: [AuthGuard] },
  { path: 'disciplina-detail/:id' , component: DisciplinaDetailComponent, canActivate: [AuthGuard] },
]

export const routes: ModuleWithProviders = RouterModule.forRoot(ROUTES);