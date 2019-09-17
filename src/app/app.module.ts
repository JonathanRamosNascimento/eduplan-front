import { PlanoDeEnsinoService } from './services/plano-de-ensino/plano-de-ensino.service';
import { PlanoDeEnsinoDetailComponent } from './components/plano-de-ensino-detail/plano-de-ensino-detail.component';
import { PlanoDeEnsinoListComponent } from './components/plano-de-ensino-list/plano-de-ensino-list.component';
import { PlanoDeEnsinoNewComponent } from './components/plano-de-ensino-new/plano-de-ensino-new.component';
import { DialogService } from './dialog.service';
import { SharedService } from './services/shared.service';
import { UserService } from './services/user/user.service';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MenuComponent } from './components/menu/menu.component';
import { LoginComponent } from './components/security/login/login.component';
import { routes } from './app.routes'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './components/security/auth.guard';
import { UserNewComponent } from './components/user-new/user-new.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { AuthInterceptor } from './components/security/auth.interceptor';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    LoginComponent,
    HomeComponent,
    UserNewComponent,
    UserListComponent,
    PlanoDeEnsinoNewComponent,
    PlanoDeEnsinoListComponent,
    PlanoDeEnsinoDetailComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    routes,
    NgxPaginationModule
  ],
  providers: [
    UserService, 
    AuthGuard, 
    SharedService,
    DialogService,
    PlanoDeEnsinoService,
    { provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
