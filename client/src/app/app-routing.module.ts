import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndexViewComponent } from "./index-view/index-view.component";
import { ConnexionComponent } from "./connexion/connexion.component";
import { RegisterComponent } from "./register/register.component";
import { EmailConfirmationComponent } from "./email-confirmation/email-confirmation.component";
import { RegisterConnexionComponent } from "./register-connexion/register-connexion.component";
import { ForgetPasswordComponent } from "./forget-password/forget-password.component";
import { ReinitPasswordComponent } from "./reinit-password/reinit-password.component";
import { ProfilComponent } from "./profil/profil.component";
import { HomeComponent } from "./home/home.component";
import { HistoryComponent } from "./history/history.component";
import { EmpHomeComponent } from "./emp-home/emp-home.component";
import { EmpLoginComponent } from "./emp-login/emp-login.component";
import { EmpStatsComponent } from "./emp-stats/emp-stats.component";
import { AdminHomeComponent } from "./admin-home/admin-home.component";
import { EmailingComponent } from "./emailing/emailing.component";
import { AdminLoginComponent } from "./admin-login/admin-login.component";
import { AdminNewEmpComponent } from "./admin-new-emp/admin-new-emp.component";
import { AdminModifyEmpComponent } from "./admin-modify-emp/admin-modify-emp.component";
import { AdminUpdateUserComponent } from "./admin-update-user/admin-update-user.component";
import { AdminListEmpComponent } from "./admin-list-emp/admin-list-emp.component";
import { ListUsersComponent } from "./list-users/list-users.component";
import { AdminListUsersViewComponent } from "./admin-list-users-view/admin-list-users-view.component";
import { EmpListUsersViewComponent } from "./emp-list-users-view/emp-list-users-view.component";
import { LandingPageComponent } from "./landing-page/landing-page.component";
import { SimulateurCaisseComponent } from './simulateur-caisse/simulateur-caisse.component';
import { StylePageComponent } from "./style-page/style-page.component";
import { RegisterConfirmationComponent } from "./register-confirmation/register-confirmation.component";
import { MailPasswordSentComponent } from "./mail-password-sent/mail-password-sent.component";
import { AuthGuard } from "./services/authGuard.service";
import { AuthGuardEmp } from "./services/authGuardEmp.service";
import { AuthGuardAdmin } from "./services/authGuardAdmin.service";

const routes: Routes = [
  { path :'' , component : LandingPageComponent },
  { path :'liste_pages' , component : IndexViewComponent },
  { path :'login' , component : ConnexionComponent },
  { path :'register' , component : RegisterConnexionComponent  },
  { path :'validation/:id' , component : EmailConfirmationComponent  },
  { path :'password_forgotten' , component : ForgetPasswordComponent  },
  { path :'reinit_password/:id/:token' , component : ReinitPasswordComponent  },
  { path :'client_infos_profil' ,canActivate :[AuthGuard], component : ProfilComponent  },
  { path :'client_home' , canActivate :[AuthGuard], component : HomeComponent  },
  { path :'caisse' , canActivate :[AuthGuard], component : SimulateurCaisseComponent  },
  { path :'emp'  , canActivate :[AuthGuardEmp], component : EmpHomeComponent },
  { path :'emp_home'  , canActivate :[AuthGuardEmp], component : EmpHomeComponent },
  { path :'emp_login'  ,component : EmpLoginComponent },
  { path :'emp_stats'  , canActivate :[AuthGuardEmp], component : EmpStatsComponent },
  { path :'admin'  , canActivate :[AuthGuardAdmin], component : AdminHomeComponent },
  { path :'admin_home'  , canActivate :[AuthGuardAdmin], component : AdminHomeComponent },
  { path :'admin_emailing'  , canActivate :[AuthGuardAdmin], component : EmailingComponent },
  { path :'admin_login'  ,component : AdminLoginComponent },
  { path :'admin_new_emp'  ,canActivate :[AuthGuardAdmin], component : AdminNewEmpComponent },
  { path :'admin_modify_emp/:id_emp'  ,canActivate :[AuthGuardAdmin], component : AdminModifyEmpComponent },
  { path :'admin_update_user/:id_user'  ,canActivate :[AuthGuardAdmin], component : AdminUpdateUserComponent },
  { path :'admin_list_emp'  ,canActivate :[AuthGuardAdmin], component : AdminListEmpComponent },
  { path :'list_users'  , component : ListUsersComponent },
  { path :'admin_list_users'  ,canActivate :[AuthGuardAdmin], component : AdminListUsersViewComponent },
  { path :'emp_list_users'  , component : EmpListUsersViewComponent },
  { path :'page_de_style'  , component : StylePageComponent },
  { path :'confirmation_register/:email'  , component : RegisterConfirmationComponent },
  { path :'mail_password_sent/:email'  , component : MailPasswordSentComponent },

  // { path :'history' ,component : HistoryComponent },
  { path :'**' , redirectTo : '/'  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
