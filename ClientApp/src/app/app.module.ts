import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faSquare, faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import { faSquare as farSquare, faCheckSquare as farCheckSquare } from '@fortawesome/free-regular-svg-icons';

import { AuthorizeInterceptor } from './interceptors/auth.interceptor';

import { ImageDirective } from './directives/image-directive';
import { BackButtonDirective } from './directives/back-button-directive';

import { NgbModalComponent } from './ngb-modal/ngb-modal.component';
import { NgbModalContentComponent } from './ngb-modal/ngb-modal-content.component';
import { AlertInfoComponent } from './alerts/alert-info.component';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CityComponent } from './city/city.component';
import { OrganizationsComponent } from './organization/organizations.component';
import { NotifyService } from './services/notify.service.component';
import { OrganizationAddComponent } from './organization/organization-add.component';
import { OrganizationDetailsComponent } from './organization/organization-details.component';
import { OrganizationEditComponent } from './organization/organization-edit.component';
import { MembersComponent } from './member/members.component';
import { MemberAddComponent } from './member/member-add.component';
import { MemberEditComponent } from './member/member-edit.component';
import { MemberDetailsComponent } from './member/member-details.component';

import { CityService } from './city/city.service';
import { OrganizationService } from './organization/organization.service';
import { MemberService } from './member/member.service';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CityComponent,
    OrganizationsComponent,
    OrganizationAddComponent,
    OrganizationEditComponent,
    OrganizationDetailsComponent,
    MembersComponent,
    MemberAddComponent,
    MemberEditComponent,
    MemberDetailsComponent,
    NgbModalComponent,
    NgbModalContentComponent,
    AlertInfoComponent,
    ImageDirective,
    BackButtonDirective
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'organizations', component: OrganizationsComponent },
      { path: 'organization/add', component: OrganizationAddComponent },
      { path: 'organization/edit/:id', component: OrganizationEditComponent },
      { path: 'organization/details/:id', component: OrganizationDetailsComponent },
      { path: 'cities', component: CityComponent },
      { path: 'members', component: MembersComponent },
      { path: 'members/:organizationId', component: MembersComponent },
      { path: 'member/add', component: MemberAddComponent },
      { path: 'member/edit/:id', component: MemberEditComponent },
      { path: 'member/details/:id', component: MemberDetailsComponent },
    ]),
    ReactiveFormsModule,
    NgbModule,
    FontAwesomeModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthorizeInterceptor, multi: true },
    CityService,
    NotifyService,
    OrganizationService,
    MemberService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private library: FaIconLibrary) {
    library.addIcons(faSquare, faCheckSquare, farSquare, farCheckSquare);
  }
}
