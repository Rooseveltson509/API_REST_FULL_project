import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { MatDialogModule } from '@angular/material/dialog';


import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { IndexViewComponent } from './index-view/index-view.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { HistoryComponent } from './history/history.component';

import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/authGuard.service';
import { AuthGuardAdmin } from './services/authGuardAdmin.service';
import { AuthGuardEmp } from './services/authGuardEmp.service';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LandingComponent } from './landing/landing.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { LogoFooterComponent } from './logo-footer/logo-footer.component';
import { RegisterConnexionComponent } from './register-connexion/register-connexion.component';
import { ProfilComponent } from './profil/profil.component';
import { HeaderClientComponent } from './header-client/header-client.component';
import { ReinitPasswordComponent } from './reinit-password/reinit-password.component';
import { EmailConfirmationComponent } from './email-confirmation/email-confirmation.component';
import { EmpHomeComponent } from './emp-home/emp-home.component';
import { EmpLoginComponent } from './emp-login/emp-login.component';
import { EmpStatsComponent } from './emp-stats/emp-stats.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminNewEmpComponent } from './admin-new-emp/admin-new-emp.component';
import { AdminModifyEmpComponent } from './admin-modify-emp/admin-modify-emp.component';
import { HeaderEmpComponent } from './header-emp/header-emp.component';
import { HeaderAdminComponent } from './header-admin/header-admin.component';
import { SidebarAdminComponent } from './sidebar-admin/sidebar-admin.component';
import { SidebarEmpComponent } from './sidebar-emp/sidebar-emp.component';
import { AdminListEmpComponent } from './admin-list-emp/admin-list-emp.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ReConnectComponent } from './re-connect/re-connect.component';
import { ListUsersComponent } from './list-users/list-users.component';
import { AdminListUsersViewComponent } from './admin-list-users-view/admin-list-users-view.component';
import { EmpListUsersViewComponent } from './emp-list-users-view/emp-list-users-view.component';
import { FilterPipe } from './pipes/filter.pipe';
import { AdminUpdateUserComponent } from './admin-update-user/admin-update-user.component';
import { StylePageComponent } from './style-page/style-page.component';
import { SimulateurCaisseComponent } from './simulateur-caisse/simulateur-caisse.component';
import { RegisterConfirmationComponent } from './register-confirmation/register-confirmation.component';
import { ListEmpComponent } from './list-emp/list-emp.component';
import { EmailingComponent } from './emailing/emailing.component';
import { PopUpComponent } from './pop-up/pop-up.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { PopUpDeleteComponent } from './pop-up-delete/pop-up-delete.component';
import { MailPasswordSentComponent } from './mail-password-sent/mail-password-sent.component';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    ConnexionComponent,
    IndexViewComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    HistoryComponent,
    SidebarComponent,
    LandingComponent,
    ForgetPasswordComponent,
    LogoFooterComponent,
    RegisterConnexionComponent,
    ProfilComponent,
    HeaderClientComponent,
    ReinitPasswordComponent,
    EmailConfirmationComponent,
    EmpHomeComponent,
    EmpLoginComponent,
    EmpStatsComponent,
    AdminLoginComponent,
    AdminHomeComponent,
    AdminNewEmpComponent,
    AdminModifyEmpComponent,
    HeaderEmpComponent,
    HeaderAdminComponent,
    SidebarAdminComponent,
    SidebarEmpComponent,
    AdminListEmpComponent,
    LandingPageComponent,
    ReConnectComponent,
    ListUsersComponent,
    AdminListUsersViewComponent,
    EmpListUsersViewComponent,
    FilterPipe,
    AdminUpdateUserComponent,
    StylePageComponent,
    SimulateurCaisseComponent,
    RegisterConfirmationComponent,
    ListEmpComponent,
    EmailingComponent,
    PopUpComponent,
    PopUpDeleteComponent,
    MailPasswordSentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    Ng2SearchPipeModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
    MatDialogModule
  ],
  entryComponents: [
    PopUpComponent,
    PopUpDeleteComponent,
  ],
  providers: [
    AuthService,
    AuthGuard,
    {
      provide : HTTP_INTERCEPTORS,
      useClass : TokenInterceptorService,
      multi : true
    },
    AuthGuardAdmin,
    {
      provide : HTTP_INTERCEPTORS,
      useClass : TokenInterceptorService,
      multi : true
    },
    AuthGuardEmp,
    {
      provide : HTTP_INTERCEPTORS,
      useClass : TokenInterceptorService,
      multi : true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
